import { Request, Response, NextFunction, RequestHandler } from "express";

const asyncHandler = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
): RequestHandler => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (err) {
      next(err);
    }
  };
};

export { asyncHandler };
/* this is wrapper function that takes a function as an argument and returns a new function that handles errors. */
