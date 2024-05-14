import { Request, Response, NextFunction } from "express";
import * as yup from "yup";

export const validate =
  (schema: yup.ObjectSchema<any>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validate({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (err: any) {
      return res.status(500).json({ type: err.name, message: err.message });
    }
  };
