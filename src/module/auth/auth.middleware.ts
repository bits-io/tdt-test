import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import CryptoHelper from '../../helpers/crypto.helper';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {

  constructor(
    private jwtService: JwtService,
    private userService: UserService
  ) { }

  async use(req: any, res: any, next: () => void) {
    const token = req.headers.authorization?.split(' ')[1];
    if (token) {
      try {
        const userCrypto = await CryptoHelper.verifyToken(this.jwtService, token, { allowEmpty: true });
        if (userCrypto) {
          const user = await this.userService.findOneById(userCrypto.sub);
          req.user = user;
        }
      } catch (error) {
        console.error('Error verifying token:', error);
      }
    }

    next();
  }
}
