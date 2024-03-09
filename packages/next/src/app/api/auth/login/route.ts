import { TRequest, TResponse } from '@/modules/backend/types/request.type';
import { IRequestAuth, IResponseAuth } from '@/modules/backend/types/auth.type';
import { PasswordService } from '@/modules/backend/services/password.service';
import bcrypt from 'bcrypt';
import { handleRequest } from '../../request-handler';

const passwordService = new PasswordService();

export async function POST(request: TRequest<IRequestAuth>): Promise<TResponse<IResponseAuth>> {
  return handleRequest(async () => {
    const hashedPasswords = await passwordService.findAll({ isActive: true });
    if (!hashedPasswords || hashedPasswords.length === 0) {
      throw new Error('Unauthenticated');
    }
    const { password } = await request.json();
    const comparePromises = hashedPasswords.map(async (hashedPassword) =>
      bcrypt.compare(password, hashedPassword.value)
    );
    const comparisonResults = await Promise.all(comparePromises);
    if (comparisonResults.some((isMatch) => isMatch)) {
      return { authenticated: true };
    }
    throw new Error('Unauthenticated');
  }, 'Auth success');
}
