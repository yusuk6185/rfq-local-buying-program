import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';

import bcrypt from 'bcrypt';
import moment from 'moment';
import pool from 'utils/db';

const handler = nextConnect().post(
  (req: NextApiRequest, res: NextApiResponse) => {
    const { Password, Name, Email } = req.body;
    // const { Password, Name, Email, Type } = req.body;
    // if(Type === 'supplier'){
    //   // Add Supplier
    // }

    const hashedPassword = bcrypt.hashSync(Password as string, 10);
    pool
      .query(
        `INSERT INTO "User" ("Name", "Password", "Email", "CreatedAt") VALUES ('${Name}', '${hashedPassword}', '${Email}', '${moment().format(
          'YYYY-MM-DD',
        )}');`,
      )
      .then((mes: any) => {
        if (mes) res.status(200).json({ success: true });
      })
      .catch((err: any) => {
        console.error(err);
        if (err) res.status(500).json(err);
      });
  },
);

export default handler;
