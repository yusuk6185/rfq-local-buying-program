import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';

import moment from 'moment';
import pool from 'utils/db';

const createTender = async (
  Buyer_ID: number,
  Description: string,
  Title: string,
  HeadingImage: string,
  State_ID: number,
  City_ID: number,
  Offer: number,
  ClosingAt: Date,
) =>
  pool.query(
    `INSERT INTO "Tender" ("Buyer_ID", "PublishedAt", "Description", "Title", "HeadingImage", "State_ID", "City_ID", "Offer", "CreatedAt", "ClosingAt")
       VALUES ('${Buyer_ID}', '${moment().format(
      'YYYY-MM-DD',
    )}', '${Description}', '${Title}', '${HeadingImage}', ${State_ID}, ${City_ID}, ${Offer}, '${moment().format(
      'YYYY-MM-DD',
    )}', '${ClosingAt}') RETURNING "ID"`,
  );

const createTenderAttachment = async (ID: number, URL: string) =>
  pool.query(
    `INSERT INTO "TenderAttachment" ("Tender_ID", "URL")
   VALUES ('${ID}', '${URL}')`,
  );

const handler = nextConnect()
  .get((req: NextApiRequest, res: NextApiResponse) => {
    pool
      .query(`SELECT * FROM "Tender"`)
      .then((result: any) => {
        if (result.rowCount > 0)
          return res.status(200).json({ success: true, Tenders: result.rows });
        return res.status(500).json({
          success: false,
          message: 'Something wrong when getting Tenders',
        });
      })
      .catch((err: any) => {
        return res.status(500).json({
          success: false,
          message: 'Something wrong with Tenders',
          err,
        });
      });
  })
  .post(async (req: NextApiRequest, res: NextApiResponse) => {
    const {
      Buyer_ID,
      Description,
      Title,
      HeadingImage,
      State_ID,
      City_ID,
      Offer,
      ClosingAt,
    } = req.body;
    let result = null;
    try {
      result = await createTender(
        Buyer_ID,
        Description,
        Title,
        HeadingImage,
        State_ID,
        City_ID,
        Offer,
        ClosingAt,
      );
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: 'Something wrong when creating tender',
        err,
      });
    }

    if (result.rowCount > 0) {
      const TenderID = result.rows[0].ID;
      const { TenderAttachment } = req.body;
      try {
        result = TenderAttachment.map(async (attachment: any) => {
          result = await createTenderAttachment(TenderID, attachment.URL);
        });
        return res.status(200).json({ success: true, TenderID });
      } catch (err) {
        return res.status(500).json({
          success: false,
          message: 'Something wrong when creating attachment',
          err,
        });
      }
    }
    return res
      .status(500)
      .json({ succes: false, message: 'Tender creation not successful' });
  });

export default handler;
