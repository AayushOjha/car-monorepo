import { Request, Response, NextFunction } from 'express';
import { AnySchema } from 'yup';

export const validate = (schema: AnySchema) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    await schema.validate({
      body: req.body,
      params: req.params,
      query: req.query,
    });
    return next();
  } catch (err: any) {
    return res.status(400).json({ error: err.errors });
  }
};
