import { TResponse } from '@/modules/backend/types/request.type';
import { NextResponse } from 'next/server';

export async function handleRequest<T>(
  action: () => Promise<T>,
  successMessage?: string
): Promise<TResponse<T>> {
  let resBody;
  try {
    const data = await action();
    resBody = { data, message: successMessage };
  } catch (error) {
    resBody =
      error instanceof Error ? { error: error.message } : { error: 'Internal server error' };
  }
  return NextResponse.json(resBody);
}
