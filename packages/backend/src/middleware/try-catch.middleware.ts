import { NextFunction, Request, Response } from 'express';
import { IApiResponse } from '../types/request.type';

export const tryCatch =
  (handler: (req: Request, res: Response, next: NextFunction) => Promise<IApiResponse>) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await handler(req, res, next);
      res.status(result.status).send({ data: result.data, message: result.message });
    } catch (error: any) {
      // eslint-disable-next-line no-console
      console.error(error);
      const message = error instanceof Error ? error.message : 'Internal server error';
      res.status(500).send({ message });
    }
  };
