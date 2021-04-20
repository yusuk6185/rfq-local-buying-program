import { BaseError } from './baseError';

export class HttpRequestError extends BaseError {
  constructor(public status: number, public data: any) {
    super();
  }
}
