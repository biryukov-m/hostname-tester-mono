import bcrypt from 'bcrypt';
import Password from '../models/Password';
import { IAuth, IPasswordReqBody, IPasswordUpdReqBody } from '../types/password.type';

export class AuthService {
  async findAll() {
    const passwords = await Password.find();
    return passwords;
  }

  async auth(credentials: IAuth) {
    const passwordsInDb = await Password.find();

    if (!passwordsInDb || passwordsInDb.length === 0) {
      return false;
    }

    const comparePromises = passwordsInDb.map((passwordInDb) =>
      bcrypt.compare(passwordInDb.value, credentials.password)
    );

    const comparisonResults = await Promise.all(comparePromises);
    return comparisonResults.some((isMatch) => isMatch);
  }

  async add(password: IPasswordReqBody) {
    const newPassword = await Password.create({ ...password });
    return newPassword;
  }

  async update(_id: string, password: IPasswordUpdReqBody) {
    const updatedPassword = await Password.findByIdAndUpdate(_id, { ...password }, { new: true });
    return updatedPassword;
  }

  async deleteOne(_id: string) {
    const deletedPassword = await Password.findByIdAndDelete(_id);
    return deletedPassword;
  }
}
