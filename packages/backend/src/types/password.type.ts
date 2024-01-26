import { Document } from 'mongoose';

export interface IPassword extends Document {
  value: string;
  isActive: boolean;
}
