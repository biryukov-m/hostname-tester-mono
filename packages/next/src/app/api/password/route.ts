import { PasswordService } from '@/modules/backend/services/password.service';
import {
  IPassword,
  IPasswordAddReqBody,
  IPasswordDelReqBody,
  IPasswordUpdReqBody
} from '@/modules/backend/types/password.type';
import { TRequest, TResponse } from '@/modules/backend/types/request.type';
import { FilterQuery } from 'mongoose';
import { NextResponse } from 'next/server';

const passwordService = new PasswordService();

async function handleRequest<T>(
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

export async function GET(): Promise<TResponse<IPassword[]>> {
  // TODO: Add filter from query
  // const filter: FilterQuery<IPassword> = request.nextUrl.searchParams.get('query') || {};
  return handleRequest(async () => {
    const filter: FilterQuery<IPassword> = {};
    return passwordService.findAll(filter);
  });
}

export async function POST(request: TRequest<IPasswordAddReqBody>): Promise<TResponse<IPassword>> {
  return handleRequest(async () => {
    const body = await request.json();
    const newPassword = await passwordService.add(body);
    if (!newPassword || newPassword.length < 1) {
      throw new Error("Couldn't create password");
    }
    return newPassword;
  }, 'New password');
}

export async function PUT(request: TRequest<IPasswordUpdReqBody>): Promise<TResponse<IPassword>> {
  return handleRequest(async () => {
    const body = await request.json();
    const updatedPassword = await passwordService.update(body._id, { ...body });
    if (!updatedPassword) {
      throw new Error(`Can't find password with id: ${body._id}`);
    }
    return updatedPassword;
  }, 'Password updated');
}

export async function DELETE(
  request: TRequest<IPasswordDelReqBody>
): Promise<TResponse<IPassword>> {
  return handleRequest(async () => {
    const body = await request.json();
    const deletedPassword = await passwordService.deleteOne(body._id);
    if (!deletedPassword) {
      throw new Error(`Can't find password with id: ${body._id}`);
    }
    return deletedPassword;
  }, 'Password deleted');
}
