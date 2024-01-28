import { NextRequest, NextResponse } from 'next/server';

export interface TRequest<T> extends NextRequest {
  json(): Promise<T>;
}

export type TResponse<T> = NextResponse & {
  data?: T;
  error?: string;
  message?: string;
};
