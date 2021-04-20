export class BaseError {
  constructor(...args: [(string | undefined)?]) {
    Error.apply(this, args);
  }
}
