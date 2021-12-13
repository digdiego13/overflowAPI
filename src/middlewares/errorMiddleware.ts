/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from 'express';
import RequestError from '../errors/requestError';
import NotFoundError from '../errors/notFoundError';
import ConflictError from '../errors/conflictError';
import httpStatusCode from '../enums/httpStatusCode';
import UnauthorizedError from '../errors/unauthorizedError';

const middlewareError = async (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (error instanceof RequestError) {
    return res.status(httpStatusCode.BAD_REQUEST).send(error.message);
  }
  if (error instanceof NotFoundError) {
    return res.status(httpStatusCode.NOT_FOUND).send(error.message);
  }
  if (error instanceof ConflictError) {
    return res.status(httpStatusCode.CONFLICT).send(error.message);
  }
  if (error instanceof UnauthorizedError) {
    return res.status(httpStatusCode.UNAUTHORIZED).send(error.message);
  }
  return res.sendStatus(httpStatusCode.SERVER_ERROR);
};

export default middlewareError;
