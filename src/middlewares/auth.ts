import { Request, Response, NextFunction } from "express";

const apiKey = "zRUFR7lneHrnnEBM";

export const auth = (req: Request, res: Response, next: NextFunction) => {
  const xApiKey = req.headers["x-api-key"] as string;
  if (xApiKey !== apiKey) {
    res.status(401).send("Unauthorized");
    return;
  }
  next();
};
