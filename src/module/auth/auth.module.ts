import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { HttpModule } from '@nestjs/axios';
import { MailerConfig } from 'src/configs/mailer.config';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    JwtModule.register({ 
      secret: process.env['APP_KEY'],
      signOptions: {
        expiresIn: "7d"
      }
    }),
    UserModule,
    HttpModule,
    MailerConfig,
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [
    AuthService,
    JwtModule
  ],
})
export class AuthModule {}
