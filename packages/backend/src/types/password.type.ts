import { Document } from 'mongoose';

export interface IPassword extends Document {
  value: string;
  isActive: boolean;
}

export interface IPasswordReqBody {
  value: string;
  isActive?: boolean;
}

export interface IPasswordUpdReqBody {
  _id: string;
  value?: string;
  isActive?: boolean;
}

export interface IPasswordDelReqBody {
  _id: string;
}

export interface IAuth {
  password: string;
}
