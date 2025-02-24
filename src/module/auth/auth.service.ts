import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import UserCrypto from '../../types/user-crypto.type';
import { MailerService } from '@nestjs-modules/mailer';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {

  constructor(
    private userService: UserService,
    private jwtService: JwtService,    
  ){}

  async register(registerDto: RegisterDto) {
    return await this.userService.create(registerDto);
  }  

  async login(loginDto: LoginDto) {
    const user = await this.userService.findOneByEmail(loginDto.email, false);
    if (!user) throw new BadRequestException('Invalid email or password');

    if (!await this.userService.comparePasswords(loginDto.password, user.password)) throw new BadRequestException('Invalid email or password');

    const payload: UserCrypto = { 
      sub: user.id,         
    };
    return {
      access_token: await this.jwtService.signAsync(payload, { secret: process.env['APP_KEY'] }),
      user: { ...user }
    };
  }

  async me(id: number) {
    return await this.userService.findOneById(id);
  }  
}
