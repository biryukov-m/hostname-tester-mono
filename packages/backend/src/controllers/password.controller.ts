import { IRequest } from '../types/request.type';
import {
  IPasswordDelReqBody,
  IPasswordAddReqBody,
  IPasswordUpdReqBody
} from '../types/password.type';
import { PasswordService } from '../services/password.service';

export class PasswordController {
  constructor(private passwordService: PasswordService) {}

  async getAllPasswords() {
    const passwords = await this.passwordService.findAll({});
    return passwords;
  }

  async addPassword(req: IRequest<IPasswordAddReqBody>) {
    const newPassword = await this.passwordService.add(req.body);
    return newPassword;
  }

  async updatePassword(req: IRequest<IPasswordUpdReqBody>) {
    const updatedPassword = await this.passwordService.update(req.body._id, { ...req.body });
    return updatedPassword;
  }

  async deletePassword(req: IRequest<IPasswordDelReqBody>) {
    const deletedPassword = await this.passwordService.deleteOne(req.body._id);
    return deletedPassword;
  }
}

const passwordController = new PasswordController(new PasswordService());

export default passwordController;
