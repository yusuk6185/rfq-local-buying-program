import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';

import pool from 'utils/db';

const handler = nextConnect().get(
  (req: NextApiRequest, res: NextApiResponse) => {
    pool
      .query(`SELECT * FROM "State"`)
      .then((result: any) => {
        return res.status(200).json({ success: true, State: result.rows });
      })
      .catch((err: any) => {
        return res.status(500).json({
          success: false,
          message: 'Something wrong when getting State',
          err,
        });
      });
  },
);

export default handler;
