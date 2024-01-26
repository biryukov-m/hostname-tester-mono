import bcrypt from 'bcrypt';
import { IRequest } from '../types/request.type';
import { PasswordService } from '../services/password.service';
import { IAuth } from '../types/auth.type';

export class AuthController {
  constructor(private passwordService: PasswordService) {}

  async auth(req: IRequest<IAuth>) {
    const hashedPasswords = await this.passwordService.findAll({ isActive: true });
    if (!hashedPasswords || hashedPasswords.length === 0) {
      return { authenticated: false };
    }

    const { password } = req.body;

    const comparePromises = hashedPasswords.map(async (hashedPassword) =>
      bcrypt.compare(password, hashedPassword.value)
    );

    const comparisonResults = await Promise.all(comparePromises);

    if (comparisonResults.some((isMatch) => isMatch)) {
      return { authenticated: true };
    }

    return { authenticated: false };
  }
}

const authController = new AuthController(new PasswordService());

export default authController;
