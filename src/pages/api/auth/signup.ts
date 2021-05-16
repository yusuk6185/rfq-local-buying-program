import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';

import bcrypt from 'bcrypt';
import moment from 'moment';
import pool from 'utils/db';

import { createSupplier, createBuyer } from './user';

const checkEmaiExist = async (Email: string) => {
  const result = await pool.query(`
    SELECT EXISTS (SELECT * FROM "User" WHERE "Email"='${Email}');`);
  return result.rows[0].exists;
};

const handler = nextConnect().post(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const { Type, Password, Name, Email, ABN, Logo } = req.body;

    const exists = await checkEmaiExist(Email);
    if (exists) {
      res
        .status(400)
        .json({ success: false, message: 'Email is already taken!' });
      return;
    }

    const hashedPassword = bcrypt.hashSync(Password as string, 10);
    if (Type === 'supplier') {
      const { State_ID, City_ID } = req.body;
      const SupplierID = await createSupplier(
        Name,
        ABN,
        Logo,
        State_ID,
        City_ID,
        res,
      );

      try {
        const mes = await pool.query(
          `INSERT INTO "User" ("Name", "Password", "Email", "Supplier_ID", "CreatedAt") VALUES ('${Name}', '${hashedPassword}', '${Email}', '${SupplierID}', '${moment().format(
            'YYYY-MM-DD',
          )}');`,
        );
        if (mes) {
          res.status(200).json({ success: true });
        }
      } catch (err) {
        if (err)
          res.status(500).json({ success: false, message: 'Something wrong' });
      }
    } else if (Type === 'buyer') {
      const BuyerID = await createBuyer(Name, ABN, Logo, res);

      try {
        const mes = await pool.query(
          `INSERT INTO "User" ("Name", "Password", "Email", "Buyer_ID", "CreatedAt") VALUES ('${Name}', '${hashedPassword}', '${Email}', '${BuyerID}', '${moment().format(
            'YYYY-MM-DD',
          )}');`,
        );
        if (mes) {
          res.status(200).json({ success: true });
        }
      } catch (err) {
        if (err)
          res.status(500).json({ success: false, message: 'Something wrong' });
      }
    }
  },
);

export default handler;
