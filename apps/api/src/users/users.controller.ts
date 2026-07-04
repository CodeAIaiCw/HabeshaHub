import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';
import { userSelect } from '../auth/auth.service';
import { PrismaService } from '../prisma.service';
import { UpdateMeDto } from './dto/update-me.dto';

@UseGuards(AuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly prisma: PrismaService) {}

  @Get('me')
  me(@CurrentUser() user: { sub: string }) {
    return this.prisma.user.findUniqueOrThrow({ where: { id: user.sub }, select: userSelect });
  }

  @Patch('me')
  async updateMe(@CurrentUser() user: { sub: string }, @Body() dto: UpdateMeDto) {
    const updated = await this.prisma.user.update({
      where: { id: user.sub },
      data: {
        cityId: dto.cityId,
        language: dto.language,
        interests: dto.interests,
        onboardingCompleted: Boolean(dto.cityId && dto.language),
      },
      select: userSelect,
    });

    return updated;
  }
}
