import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';

import pool from 'utils/db';

const handler = nextConnect().get(
  (req: NextApiRequest, res: NextApiResponse) => {
    const { ID } = req.query;
    pool
      .query(`SELECT * FROM "Tender" WHERE "ID"=$1`, [ID])
      .then((result: any) => {
        if (result.rowCount > 0)
          return res.status(200).json({ success: true, data: result.rows[0] });
        return res
          .status(400)
          .json({ success: false, message: 'Tender not exist' });
      })
      .catch((err: any) => {
        return res.status(500).json({
          success: false,
          message: 'Something wrong with Tender',
          err,
        });
      });
  },
);

export default handler;
