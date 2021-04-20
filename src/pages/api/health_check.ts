import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';

const handler = nextConnect().get((req: NextApiRequest, res: NextApiResponse) =>
  res.status(200).end('healthy'),
);

export default handler;
