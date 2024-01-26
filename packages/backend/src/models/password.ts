import { Schema, model } from 'mongoose';
import hashString from '../utils/hash-str.util';
import { IPassword } from '../types/password.type';

const passwordSchema: Schema<IPassword> = new Schema(
  {
    value: {
      type: String,
      required: true,
      unique: true
    },
    isActive: {
      type: Boolean,
      default: true
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
    const hashedPassword = await hashString(password.value);
    password.value = hashedPassword;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error hashing password: ', error);
    return error instanceof Error ? next(error) : next();
  }
});

export default model<IPassword>('Password', passwordSchema);
