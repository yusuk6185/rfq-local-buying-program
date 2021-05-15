import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';

import bcrypt from 'bcrypt';

import pool from './db';

const handler = nextConnect().post(
  (req: NextApiRequest, res: NextApiResponse) => {
    const { name, password, email } = req.query;
    const hashedPassword = bcrypt.hashSync(password, 10);

    pool
      .query(
        `INSERT INTO public.user (Name, Password, Email) VALUES ('${name}', '${hashedPassword}', '${email}');`,
      )
      .then((mes: any) => {
        if (mes) res.status(200).json({ success: true });
      })
      .catch((err: any) => {
        if (err) res.status(500).json(err);
      });
  },
);

export default handler;
