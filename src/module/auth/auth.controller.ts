import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFiles, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { Transactional } from 'typeorm-transactional';
import { LoginDto } from './dto/login.dto';
import { UserSession } from '../../helpers/decorator.helper';
import { User } from '../user/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {}

  @Transactional()
  @Post('/register')
  async register(@Body() registerDto: RegisterDto) {
    return await this.authService.register(registerDto);
  }  

  @Post('/login')
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto);
  }

  @Get('/me')
  me(@UserSession() user: User) {
    return {
      me: user
    };
  }
}
