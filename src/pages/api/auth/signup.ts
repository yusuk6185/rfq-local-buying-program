import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';

import bcrypt from 'bcrypt';
import moment from 'moment';
import pool from 'utils/db';

import {
  Buyer,
  BuyerHasOneUser,
  Supplier,
  SupplierHasOneUser,
} from '../../../sequelize/models';

const checkEmailExist = async (Email: string) => {
  let result = null;
  result = await pool.query(
    `SELECT EXISTS (SELECT * FROM "User" WHERE "Email"='${Email}');`,
  );

  return result.rows[0].exists;
};

const handler = nextConnect().post(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const {
      State_ID,
      City_ID,
      Description,
      Type,
      Password,
      Name,
      Email,
      ABN,
      Logo,
      SupplyCategories,
    } = req.body;
    let exists = null;
    try {
      exists = await checkEmailExist(Email);
    } catch (err) {
      return res.status(500).json({ err });
    }

    if (exists) {
      return res
        .status(400)
        .json({ success: false, message: 'Email is already taken!' });
    }

    const hashedPassword = bcrypt.hashSync(Password as string, 10);
    if (Type === 'supplier') {
      const supplier = await Supplier.create(
        {
          Name,
          ABN,
          Logo,
          State_ID,
          City_ID,
          Description,
          User: {
            Name,
            Password: hashedPassword,
            Email,
          },
        },
        {
          include: [
            {
              association: SupplierHasOneUser,
              as: 'User',
            },
          ],
        },
      );
      if ((SupplyCategories || [])?.length) {
        await supplier.addSupplyCategories(SupplyCategories);
      }
      return res.status(200).json({ success: true, data: supplier });
    }
    if (Type === 'buyer') {
      const buyer = await Buyer.create(
        {
          Name,
          ABN,
          Logo,
          State_ID,
          City_ID,
          Description,
          User: {
            Name,
            Password: hashedPassword,
            Email,
          },
        },
        {
          include: [
            {
              association: BuyerHasOneUser,
              as: 'User',
            },
          ],
        },
      );
      return res.status(200).json({ success: true, data: buyer });
    }
    if (Type === 'user') {
      try {
        const result = await pool.query(
          `INSERT INTO "User" ("Name", "Password", "Email", "CreatedAt") VALUES ('${Name}', '${hashedPassword}', '${Email}', '${moment().format(
            'YYYY-MM-DD',
          )}');`,
        );
        if (result) return res.status(200).json({ succes: true });
      } catch (err) {
        return res
          .status(500)
          .json({ success: false, message: 'Cannot create user' });
      }
    }
    return res.status(500).json({ message: 'something resally wrong' });
  },
);

export default handler;
