import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';

import bcrypt from 'bcrypt';
import moment from 'moment';
import pool from 'utils/db';

import { createSupplier, createBuyer } from './user';

const checkEmaiExist = async (Email: string) => {
  let result = null;
  // Reported unnecessary try catch wrapper
  result = await pool.query(
    `SELECT EXISTS (SELECT * FROM "User" WHERE "Email"='${Email}');`,
  );

  return result.rows[0].exists;
};

const handler = nextConnect().post(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const { Type, Password, Name, Email, ABN, Logo } = req.body;
    let exists = null;
    try {
      exists = await checkEmaiExist(Email);
    } catch (err) {
      res.status(500).json({ err });
    }

    if (exists) {
      res
        .status(400)
        .json({ success: false, message: 'Email is already taken!' });
      return;
    }

    const hashedPassword = bcrypt.hashSync(Password as string, 10);
    if (Type === 'supplier') {
      const { State_ID, City_ID } = req.body;
      createSupplier(Name, ABN, Logo, State_ID, City_ID).then((result: any) => {
        const SupplierID = result.rows[0].ID;
        if (SupplierID)
          pool
            .query(
              `INSERT INTO "User" ("Name", "Password", "Email", "Supplier_ID", "CreatedAt") VALUES ('${Name}', '${hashedPassword}', '${Email}', '${SupplierID}', '${moment().format(
                'YYYY-MM-DD',
              )}');`,
            )
            .then((mes: any) => {
              if (mes) res.status(200).json({ success: true });
            })
            .catch((err: any) => {
              if (err)
                res
                  .status(500)
                  .json({ success: false, message: 'Something wrong' });
            });
      });
    } else if (Type === 'buyer') {
      createBuyer(Name, ABN, Logo)
        .then((result: any) => {
          const BuyerID = result.rows[0].ID;

          pool
            .query(
              `INSERT INTO "User" ("Name", "Password", "Email", "Buyer_ID", "CreatedAt") VALUES ('${Name}', '${hashedPassword}', '${Email}', '${BuyerID}', '${moment().format(
                'YYYY-MM-DD',
              )}');`,
            )
            .then((mes: any) => {
              if (mes) res.status(200).json({ success: true });
            });
        })
        .catch((err: any) => {
          if (err)
            res.status(500).json({ succss: false, message: 'Something wrong' });
        });
    }
  },
);

export default handler;
