import { AuthService } from '../services/auth.service';
import { IRequest } from '../types/request.type';
import {
  IAuth,
  IPasswordDelReqBody,
  IPasswordReqBody,
  IPasswordUpdReqBody
} from '../types/password.type';

export class AuthController {
  constructor(private authService: AuthService) {}

  async getAllPasswords() {
    const passwords = await this.authService.findAll();
    return passwords;
  }

  async addPassword(req: IRequest<IPasswordReqBody>) {
    const newPassword = await this.authService.add(req.body);
    return newPassword;
  }

  async updatePassword(req: IRequest<IPasswordUpdReqBody>) {
    const updatedPassword = await this.authService.update(req.body._id, { ...req.body });
    return updatedPassword;
  }

  async deletePassword(req: IRequest<IPasswordDelReqBody>) {
    const deletedPassword = await this.authService.deleteOne(req.body._id);
    return deletedPassword;
  }

  async auth(req: IRequest<IAuth>) {
    const isMatch = await this.authService.auth(req.body);
    return isMatch;
  }
}

const authController = new AuthController(new AuthService());

export default authController;
