import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';

import moment from 'moment';
import pool from 'utils/db';

const createProposal = async (
  Tender_ID: number,
  Supplier_ID: number,
  Description: string,
  Offer: any,
) =>
  pool.query(
    `INSERT INTO "Proposal" ("Tender_ID", "Supplier_ID", "Description", "Offer", "CreatedAt")
     VALUES ('${Tender_ID}', '${Supplier_ID}', '${Description}', ${Offer}, '${moment().format(
      'YYYY-MM-DD',
    )}')
     RETURNING "ID"`,
  );

const createProposalAttachment = async (ID: number, URL: string) =>
  pool.query(
    `INSERT INTO "ProposalAttachment" ("Proposal_ID", "URL")
   VALUES ('${ID}', '${URL}') RETURNING "ID"`,
  );

const handler = nextConnect()
  .get((req: NextApiRequest, res: NextApiResponse) => {
    pool
      .query(`SELECT * FROM "Proposal"`)
      .then((result: any) => {
        if (result.rowCount > 0)
          return res.status(200).json({ success: true, Proposal: result.rows });
        return res.status(400).json({
          succes: false,
          message: 'Something wrong when getting Proposal',
        });
      })
      .catch((err: any) => {
        return res.status(500).json({
          success: false,
          message: 'Something wrong with Proposal',
          err,
        });
      });
  })
  .post(async (req: NextApiRequest, res: NextApiResponse) => {
    const { Description, Offer } = req.body;
    const { Tender_ID, Supplier_ID } = jwtdecode(req.headers.authorization);
    let result = null;
    try {
      result = await createProposal(Tender_ID, Supplier_ID, Description, Offer);
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: 'Something wrong when creating Proposal',
        err,
      });
    }

    const ProposalID = result.rows[0].ID;
    const { ProposalAttachment } = req.body;
    if (ProposalAttachment !== undefined && ProposalAttachment.length > 0)
      try {
        ProposalAttachment.map(async (attachment: any) => {
          result = await createProposalAttachment(ProposalID, attachment.URL);
          return result;
        });
        return res.status(200).json({ success: true, ProposalID });
      } catch (err) {
        return res.status(500).json({
          success: false,
          message: 'Something wrong when creating attachment',
          err,
        });
      }
    else return res.status(200).json({ success: true, ProposalID });

    return res
      .status(500)
      .json({ succes: false, message: 'Create Proposal not successful' });
  });

export default handler;
