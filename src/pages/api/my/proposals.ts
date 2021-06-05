import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';

import authUserMiddleware from '../../../middlewares/authUserMiddleware';
import onlySuppliersMiddleware from '../../../middlewares/onlySuppliersMiddleware';
import { withErrorHandler } from '../../../middlewares/withErrorHandler';
import {
  Buyer,
  Proposal,
  ProposalAttachment,
  ProposalTenderProduct,
  Supplier,
  Tender,
  TenderProduct,
} from '../../../sequelize/models';

const handler = nextConnect()
  .use(authUserMiddleware())
  .use(onlySuppliersMiddleware())
  .get(
    withErrorHandler(async (req: NextApiRequest, res: NextApiResponse) => {
      const proposals = await Proposal.findAll({
        where: {
          Supplier_ID: req.user!.Supplier_ID,
        },
        include: [
          {
            model: Tender,
            as: 'Tender',
            include: [{ model: Buyer, as: 'Buyer' }],
          },
          { model: Supplier, as: 'Supplier' },
          { model: ProposalAttachment, as: 'ProposalAttachments' },
          {
            model: ProposalTenderProduct,
            as: 'ProposalTenderProducts',
            nested: true,
            include: [
              {
                model: TenderProduct,
                as: 'TenderProduct',
              },
            ],
          },
        ],
      });
      return res.status(200).json({
        success: false,
        items: proposals,
      });
    }),
  );

export default handler;
