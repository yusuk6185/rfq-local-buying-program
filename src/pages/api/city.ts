import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';

import pool from 'utils/db';

const handler = nextConnect().get(
  (req: NextApiRequest, res: NextApiResponse) => {
    pool
      .query(`SELECT * FROM "City"`)
      .then((result: any) => {
        if (result.rowCount > 0)
          return res.status(200).json({ success: true, City: result.rows });
        return res
          .status(400)
          .json({ success: false, message: 'No City Exist' });
      })
      .catch((err: any) => {
        return res.status(500).json({
          success: false,
          message: 'Something wrong when getting City',
          err,
        });
      });
  },
);

export default handler;
