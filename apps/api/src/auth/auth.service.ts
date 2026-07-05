import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  async register(dto: RegisterDto) {
    return {
      message: 'Registration endpoint is working.',
      email: dto.email,
      name: dto.name ?? null,
    };
  }
}