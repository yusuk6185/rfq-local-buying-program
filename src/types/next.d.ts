// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as next from 'next';

import { IUser } from 'models/IUser';

declare module 'next' {
  export interface NextApiRequest {
    user?: IUser;
  }
}
