import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';

import pool from 'utils/db';

import authUserMiddleware from '../../../middlewares/authUserMiddleware';
import onlySuppliersMiddleware from '../../../middlewares/onlySuppliersMiddleware';
import { withErrorHandler } from '../../../middlewares/withErrorHandler';
import { Proposal, ProposalTenderProducts } from '../../../sequelize/models';

const createProposalAttachment = async (ID: number, URL: string) =>
  pool.query(
    `INSERT INTO "ProposalAttachment" ("Proposal_ID", "URL")
   VALUES ('${ID}', '${URL}') RETURNING "ID"`,
  );

const handler = nextConnect()
  .use(authUserMiddleware())
  .use(onlySuppliersMiddleware())
  .post(
    withErrorHandler(async (req: NextApiRequest, res: NextApiResponse) => {
      const { ProposalAttachments, ...restProps } = req.body;
      const proposal = await Proposal.create(
        { ...restProps, Supplier_ID: req.user?.Supplier_ID },
        {
          include: [
            {
              association: ProposalTenderProducts,
              as: 'categories',
            },
          ],
        },
      );
      if (ProposalAttachments !== undefined && ProposalAttachments.length > 0) {
        try {
          await Promise.all(
            ProposalAttachments.map(async (attachment: any) => {
              return createProposalAttachment(proposal.ID, attachment.URL);
            }),
          );
        } catch (err) {
          return res.status(500).json({
            success: false,
            message: 'Something wrong when creating attachment',
            err,
          });
        }
      }

      return res.status(200).json({
        success: true,
        data: proposal,
      });
    }),
  );

export default handler;
