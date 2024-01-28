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

export async function GET(): Promise<TResponse<IPassword[]>> {
  // TODO: Add filter from query
  // const filter: FilterQuery<IPassword> = request.nextUrl.searchParams.get('query') || {};
  const filter: FilterQuery<IPassword> = {};
  const passwords = await passwordService.findAll(filter);
  return NextResponse.json({ data: passwords, message: 'Passwords' });
}

export async function POST(request: TRequest<IPasswordAddReqBody>): Promise<TResponse<IPassword>> {
  const body = await request.json();
  const newPassword = await passwordService.add(body);
  return NextResponse.json({ data: newPassword, message: 'Password added' });
}

export async function PUT(request: TRequest<IPasswordUpdReqBody>): Promise<TResponse<IPassword>> {
  const body = await request.json();
  const updatedPassword = await passwordService.update(body._id, { ...body });
  if (!updatedPassword) {
    throw new Error(`Can't find password with id: ${body._id}`);
  }
  return NextResponse.json({ data: updatedPassword, message: 'Password updated' });
}

export async function DELETE(
  request: TRequest<IPasswordDelReqBody>
): Promise<TResponse<IPassword>> {
  const body = await request.json();
  const deletedPassword = await passwordService.deleteOne(body._id);
  if (!deletedPassword) {
    throw new Error(`Can't find password with id: ${body._id}`);
  }
  return NextResponse.json({ data: deletedPassword, message: 'Password deleted' });
}
