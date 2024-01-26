import { NextFunction, Request, Response } from 'express';

export const tryCatch =
  (handler: (req: Request, res: Response, next: NextFunction) => Promise<unknown>) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await handler(req, res, next);
      res.status(200).send({ result });
    } catch (error: any) {
      // eslint-disable-next-line no-console
      console.error(error);
      res.status(500).send({ error });
    }
  };
