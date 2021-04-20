export interface IError {
  code?: string;
  message: string;
}

export class HttpError implements IError {
  constructor(message: string, code?: number) {
    this.message = message;
    this.code = (code || 400).toString();
  }

  code?: string;

  message: string;
}
