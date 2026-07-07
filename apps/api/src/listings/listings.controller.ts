import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { ListingsService } from './listings.service';
import { CreateListingDto } from './dto/create-listing.dto';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Controller('listings')
export class ListingsController {
  constructor(
    private readonly listingsService: ListingsService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @CurrentUser() user: any,
    @Body() dto: CreateListingDto,
  ) {
    return this.listingsService.create(user.id, dto);
  }
  @UseGuards(JwtAuthGuard)
  @Patch(':id/publish')
  publish(
    @CurrentUser() user: any,
    @Param('id') id: string,
  ) {
    return this.listingsService.publish(id, user.id);
  }
@Get('test')
test() {
  return {
    ok: true,
    message: 'Listings controller is alive',
  };
}
  @Get()
  findAll() {
    return this.listingsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.listingsService.findOne(id);
  }
}