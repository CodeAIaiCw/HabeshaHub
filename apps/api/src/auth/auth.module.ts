import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { PrismaService } from '../prisma.service';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET!,
      signOptions: {
        expiresIn: '15m',
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, PrismaService, JwtStrategy],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}