import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';

import authUserMiddleware from '../../../middlewares/authUserMiddleware';
import { withErrorHandler } from '../../../middlewares/withErrorHandler';
import { Proposal, Tender } from '../../../sequelize/models';

const handler = nextConnect()
  .use(authUserMiddleware())
  .get(
    withErrorHandler(async (req: NextApiRequest, res: NextApiResponse) => {
      const { ID } = req.query;
      const proposal = await Proposal.findByPk(ID as string, {
        include: [{ all: true, nested: true }],
        // include: [
        //   {
        //     model: Tender,
        //     as: 'Tender',
        //     include: [{ model: Buyer, as: 'Buyer' }],
        //   },
        //   { model: Supplier, as: 'Supplier' },
        //   { model: ProposalAttachment, as: 'ProposalAttachments' },
        //   {
        //     model: ProposalTenderProduct,
        //     as: 'ProposalTenderProducts',
        //     nested: true,
        //     include: [
        //       {
        //         model: TenderProduct,
        //         as: 'TenderProduct',
        //       },
        //     ],
        //   },
        // ],
      });
      if (proposal) {
        return res.status(200).json({
          success: true,
          data: proposal,
        });
      }
      return res.status(404).json({
        success: true,
        data: null,
      });
    }),
  )
  .put(
    withErrorHandler(async (req: NextApiRequest, res: NextApiResponse) => {
      if (!req.user) {
        throw new Error('Only authenticated users');
      }
      const proposalEntity = await Proposal.findByPk(req.query.ID as string, {
        include: [{ model: Tender, as: 'Tender' }],
      });
      if (!proposalEntity) {
        return res.status(404).json({
          success: false,
          message: 'Proposal not found',
        });
      }

      let proposal;
      if (req.user.Supplier_ID === proposalEntity.Supplier_ID) {
        proposal = await Proposal.update(req.body, {
          where: { ID: req.query.ID, Supplier_ID: req.user?.Supplier_ID },
        });
        return res.status(200).json({
          success: true,
          data: proposal,
        });
      }

      if (proposalEntity?.Tender?.Buyer_ID === req.user.Buyer_ID) {
        // Check if the user is the owner of a tender, if so, he is allowed to change the ApprovedAt.
        proposal = await Proposal.update(
          {
            ApprovedAt: req.body.ApprovedAt,
          },
          {
            where: { ID: req.query.ID },
          },
        );
        return res.status(200).json({
          success: true,
          data: proposal,
        });
      }
      return res.status(400).json({
        success: false,
      });
    }),
  );

export default handler;
