import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { PrismaService } from '../prisma.service';
import { env } from '../config/env';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtUser } from './auth.types';

const TOKEN_TTL = '7d';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async register(dto: RegisterDto) {
    const normalizedEmail = dto.email.trim().toLowerCase();

    const existing = await this.prisma.user.findUnique({ where: { email: normalizedEmail } });
    if (existing) {
      throw new ConflictException('An account with this email already exists.');
    }

    const passwordHash = await bcrypt.hash(dto.password, 12);
    const user = await this.prisma.user.create({
      data: {
        email: normalizedEmail,
        passwordHash,
        firstName: dto.firstName.trim(),
        lastName: dto.lastName.trim(),
      },
      select: userSelect,
    });

    return { user, accessToken: this.signToken(user) };
  }

  async login(dto: LoginDto) {
    const normalizedEmail = dto.email.trim().toLowerCase();
    const userWithPassword = await this.prisma.user.findUnique({ where: { email: normalizedEmail } });

    if (!userWithPassword) {
      throw new UnauthorizedException('Invalid email or password.');
    }

    const valid = await bcrypt.compare(dto.password, userWithPassword.passwordHash);
    if (!valid) {
      throw new UnauthorizedException('Invalid email or password.');
    }

    const user = await this.prisma.user.findUniqueOrThrow({
      where: { id: userWithPassword.id },
      select: userSelect,
    });

    return { user, accessToken: this.signToken(user) };
  }

  verifyToken(token: string): JwtUser {
    try {
      return jwt.verify(token, env.jwtSecret) as JwtUser;
    } catch {
      throw new UnauthorizedException('Invalid or expired token.');
    }
  }

  private signToken(user: { id: string; email: string; role: string }) {
    return jwt.sign({ sub: user.id, email: user.email, role: user.role }, env.jwtSecret, {
      expiresIn: TOKEN_TTL,
      issuer: 'habeshahub-api',
      audience: 'habeshahub-web',
    });
  }
}

export const userSelect = {
  id: true,
  email: true,
  firstName: true,
  lastName: true,
  role: true,
  status: true,
  cityId: true,
  city: true,
  language: true,
  interests: true,
  avatar: true,
  phone: true,
  phoneVerifiedAt: true,
  emailVerifiedAt: true,
  onboardingCompleted: true,
  createdAt: true,
  updatedAt: true,
} as const;
