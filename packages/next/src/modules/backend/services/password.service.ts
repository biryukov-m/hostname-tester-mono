import { FilterQuery } from 'mongoose';
import Password from '../models/password';
import { IPassword, IPasswordAddReqBody, IPasswordUpdReqBody } from '../types/password.type';
import connectDb from '../config/database.config';

export class PasswordService {
  async findAll(filter: FilterQuery<IPassword>) {
    await connectDb();
    const passwords = await Password.find(filter);
    return passwords;
  }

  async add(password: IPasswordAddReqBody) {
    await connectDb();
    const newPassword = await Password.create({ ...password });
    return newPassword;
  }

  async update(_id: string, password: IPasswordUpdReqBody) {
    await connectDb();
    const foundPassword = await Password.findById(_id);
    if (foundPassword) {
      Object.assign(foundPassword, password);
      await foundPassword.save();
    }
    return foundPassword;
  }

  async deleteOne(_id: string) {
    await connectDb();
    const deletedPassword = await Password.findByIdAndDelete(_id);
    return deletedPassword;
  }
}
