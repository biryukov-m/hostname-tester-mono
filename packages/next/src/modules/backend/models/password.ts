import mongoose, { Schema, model } from 'mongoose';
import hashPassword from '../utils/hash-password.util';
import { IPassword } from '../types/password.type';

const passwordSchema: Schema<IPassword> = new Schema(
  {
    value: {
      type: String,
      required: true
    },
    isActive: {
      type: Boolean,
      default: true
    },
    description: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

passwordSchema.pre<IPassword>('save', async function hash(next) {
  const password = this;
  if (!password.isModified) {
    return next();
  }
  try {
    password.description += ` ${password.value}`;
    const hashedPassword = await hashPassword(password.value);
    password.value = hashedPassword;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error hashing password: ', error);
    return error instanceof Error ? next(error) : next();
  }
});

passwordSchema.set('toJSON', {
  transform(_doc, ret) {
    delete ret.value;
    return ret;
  }
});

export default mongoose.models.Password || model<IPassword>('Password', passwordSchema);