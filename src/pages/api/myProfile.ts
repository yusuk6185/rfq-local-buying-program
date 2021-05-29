import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';

import pool from 'utils/db';

const getUserSupplierData = async (ID: number) =>
  pool.query(
    `SELECT "User"."ID" , "User"."Name", "User"."Email", "User"."Supplier_ID", "User"."CreatedAt", "Supplier"."ABN",  "Supplier"."Logo",  "Supplier"."State_ID",  "Supplier"."City_ID"  FROM "User", "Supplier" WHERE "User"."ID"=${ID} AND "Supplier"."ID"="User"."Supplier_ID" ;`,
  );

const getUserBuyerData = async (ID: number) =>
  pool.query(
    `SELECT "User"."ID"AS "ID", "User"."Name", "User"."Email", "User"."Supplier_ID", "User"."CreatedAt", "Buyer"."ABN",  "Buyer"."Logo" FROM "User", "Buyer" WHERE "User"."ID"=${ID} AND "Buyer"."ID"="User"."Buyer_ID";`,
  );

const getCity = async (ID: number) =>
  pool.query(`SELECT "ID","Name" FROM "City" WHERE "ID"=${ID}`);

const getState = async (ID: number) =>
  pool.query(`SELECT "ID","Name", "Acronym" FROM "State" WHERE "ID"=${ID}`);

const handler = nextConnect().post(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const { ID, Type } = req.body;
    let result = null;
    try {
      if (Type === 'supplier') result = await getUserSupplierData(ID);
      else if (Type === 'buyer') result = await getUserBuyerData(ID);
    } catch (err) {
      res.status(500).json({
        success: false,
        message: 'something wrong when getting User data',
      });
    }
    if (result.rowCount > 0) {
      result = result.rows[0];
      if (Type === 'supplier') {
        let city = null;
        let state = null;
        try {
          city = await getCity(result.City_ID);
          state = await getState(result.State_ID);
        } catch (err) {
          res.status(500).json({
            success: false,
            message: 'somthing wrong when getting state or city',
          });
        }
        result.city = city.rows[0];
        result.state = state.rows[0];
      }
      return res.status(200).json({ success: true, UserData: result });
    }
    return res.status(400).json({ success: false, message: 'user not exist' });
  },
);

export default handler;
