import bcrypt from 'bcrypt';
import { IApiResponse, IRequest } from '../types/request.type';
import { PasswordService } from '../services/password.service';
import { IRequestAuth, IResponseAuth } from '../types/auth.type';

export class AuthController {
  constructor(private passwordService: PasswordService) {}

  async auth(req: IRequest<IRequestAuth>): Promise<IApiResponse<IResponseAuth>> {
    const hashedPasswords = await this.passwordService.findAll({ isActive: true });
    if (!hashedPasswords || hashedPasswords.length === 0) {
      throw new Error('unauthenticated');
    }

    const { password } = req.body;

    const comparePromises = hashedPasswords.map(async (hashedPassword) =>
      bcrypt.compare(password, hashedPassword.value)
    );

    const comparisonResults = await Promise.all(comparePromises);

    if (comparisonResults.some((isMatch) => isMatch)) {
      return { status: 200, data: { authenticated: true } };
    }

    throw new Error('unauthenticated');
  }
}

const authController = new AuthController(new PasswordService());

export default authController;
