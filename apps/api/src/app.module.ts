import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import configuration from './config/configuration';

import { AppController } from './app.controller';
import { PrismaService } from './prisma.service';

import { AuthModule } from './auth/auth.module';
import { ListingsModule } from './listings/listings.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      envFilePath: ['apps/api/.env', '.env'],
    }),

    AuthModule,
    ListingsModule,
  ],

  controllers: [AppController],

  providers: [PrismaService],
})
export class AppModule {}