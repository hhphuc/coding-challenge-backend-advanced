import { Request, Response } from "express";
import { ErrorStatus, ErrorWithStatus } from "../utils/errors";

export const errorHandling = (
  err: ErrorWithStatus,
  req: Request,
  res: Response,
  next: () => void,
) => {
  res.status(err.status || ErrorStatus.INTERNAL_SERVER_ERROR).json({
    type: err.name,
    message: err.message,
  });
};
