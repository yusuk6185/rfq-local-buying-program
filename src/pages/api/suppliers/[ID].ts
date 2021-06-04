import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';

import { Supplier } from '../../../sequelize/models';

const handler = nextConnect().get(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const { ID } = req.query;
    try {
      const supplier = await Supplier.findByPk(ID as string, {
        include: [{ all: true, nested: true }],
      });
      if (supplier) {
        return res.status(200).json({ success: true, data: supplier.toJSON() });
      }
      return res.status(404).json({ success: true, data: {} });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: 'Something wrong when getting Supplier',
        err,
      });
    }
  },
);

export default handler;
