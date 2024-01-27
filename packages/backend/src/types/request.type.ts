import { Request } from 'express';

export interface IRequest<T = {}> extends Request {
  body: T;
}

export interface IApiResponse<T = any> {
  status: number;
  data?: T;
  error?: string;
  message?: string;
}
