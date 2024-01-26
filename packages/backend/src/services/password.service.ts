import { FilterQuery } from 'mongoose';
import Password from '../models/Password';
import { IPassword, IPasswordAddReqBody, IPasswordUpdReqBody } from '../types/password.type';

export class PasswordService {
  async findAll(filter: FilterQuery<IPassword>) {
    const passwords = await Password.find(filter);
    return passwords;
  }

  async add(password: IPasswordAddReqBody) {
    const newPassword = await Password.create({ ...password });
    return newPassword;
  }

  async update(_id: string, password: IPasswordUpdReqBody) {
    const foundPassword = await Password.findById(_id);
    if (foundPassword) {
      Object.assign(foundPassword, password);
      await foundPassword.save();
    }
    return foundPassword;
  }

  async deleteOne(_id: string) {
    const deletedPassword = await Password.findByIdAndDelete(_id);
    return deletedPassword;
  }
}
