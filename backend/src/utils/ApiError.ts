export class ApiError extends Error {
  public statusCode: number;
  public errors: object | null;

  constructor(
    statusCode: number,
    message: string,
    errors: object | null = null
  ) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
    Error.captureStackTrace(this, this.constructor);
  }
}
