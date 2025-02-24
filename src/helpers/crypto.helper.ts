import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import UserCrypto from '../types/user-crypto.type';

class CryptoHelper {

    static readonly saltOrRounds = 10;

    public static secret() {
        return process.env['APP_KEY'];
    }

    public static encrypt(password: string): Promise<string> {
        return bcrypt.hash(password, CryptoHelper.saltOrRounds);
    }

    public static compare(password: string, hash: string) {
        return bcrypt.compare(password, hash);
    }

    public static async verifyToken(jwtService: JwtService, token: string, opt?: { allowEmpty?: boolean }): Promise<UserCrypto | null> {
        let user = null;
        if (opt?.allowEmpty && !token) {
            return null;
        }

        try {
            user = await jwtService.verifyAsync(
                token,
                { secret: CryptoHelper.secret() }
            );
            
        } catch (error) {
            throw new UnauthorizedException("Unable to verify the token");
        }
        
        return {
            sub: user.sub,           // Subject (usually user ID)
            aud: user.aud ?? null,   // Audience (optional)
            exp: user.exp ?? null,   // Expiration time (optional)
            iss: user.iss ?? null,   // Issuer (optional)
            jti: user.jti ?? null,   // JWT ID (optional)
            nbf: user.nbf ?? null,   // Not Before (optional)
            iat: user.iat            // Issued at time (mandatory)
        };
    }
}

export default CryptoHelper;