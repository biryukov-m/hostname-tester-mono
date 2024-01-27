import { FilterQuery } from 'mongoose';
import { IApiResponse, IRequest } from '../types/request.type';
import {
  IPasswordDelReqBody,
  IPasswordAddReqBody,
  IPasswordUpdReqBody,
  IPassword
} from '../types/password.type';
import { PasswordService } from '../services/password.service';

export class PasswordController {
  constructor(private passwordService: PasswordService) {}

  async getAll(req: IRequest): Promise<IApiResponse<IPassword[]>> {
    // TODO: Add filter from query
    const filter: FilterQuery<IPassword> = req.query;
    const passwords = await this.passwordService.findAll(filter);
    return { status: 200, data: passwords, message: 'Passwords' };
  }

  async add(req: IRequest<IPasswordAddReqBody>): Promise<IApiResponse<IPassword>> {
    const newPassword = await this.passwordService.add(req.body);
    return { status: 201, data: newPassword, message: 'Password added' };
  }

  async update(req: IRequest<IPasswordUpdReqBody>): Promise<IApiResponse<IPassword>> {
    const updatedPassword = await this.passwordService.update(req.body._id, { ...req.body });
    if (!updatedPassword) {
      throw new Error(`Can't find password with id: ${req.body._id}`);
    }
    return { status: 201, data: updatedPassword, message: 'Password updated' };
  }

  async delete(req: IRequest<IPasswordDelReqBody>): Promise<IApiResponse<IPassword>> {
    const deletedPassword = await this.passwordService.deleteOne(req.body._id);
    if (!deletedPassword) {
      throw new Error(`Can't find password with id: ${req.body._id}`);
    }
    return { status: 201, data: deletedPassword, message: 'Password deleted' };
  }
}

const passwordController = new PasswordController(new PasswordService());

export default passwordController;
