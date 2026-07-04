import { Controller, Get } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Controller()
export class AppController {
  constructor(private readonly prisma: PrismaService) {}

  @Get('health')
  health() {
    return {
      status: 'ok',
      product: 'HabeshaHub',
      tagline: 'Find. Connect. Thrive.',
      timestamp: new Date().toISOString(),
    };
  }

  @Get('cities')
  async cities() {
    return this.prisma.city.findMany({ orderBy: { name: 'asc' } });
  }

  @Get('categories')
  categories() {
    return [
      { key: 'live', label: 'Live', description: 'Housing and roommates' },
      { key: 'work', label: 'Work', description: 'Jobs and hiring' },
      { key: 'shop', label: 'Shop', description: 'Marketplace and cars' },
      { key: 'eat', label: 'Eat', description: 'Restaurants and groceries' },
      { key: 'connect', label: 'Connect', description: 'Churches, mosques, students' },
      { key: 'explore', label: 'Explore', description: 'Events and community' },
    ];
  }
}
