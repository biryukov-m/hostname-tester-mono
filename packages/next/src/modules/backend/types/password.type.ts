import { Document } from 'mongoose';

export interface IPassword extends Document {
  value: string;
  isActive: boolean;
  description: string;
}

export interface IPasswordAddReqBody {
  value: string;
  isActive?: boolean;
  description?: string;
}

export interface IPasswordUpdReqBody {
  _id: string;
  value?: string;
  isActive?: boolean;
  description?: string;
}

export interface IPasswordDelReqBody {
  _id: string;
}
