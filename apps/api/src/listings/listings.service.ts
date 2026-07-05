import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateListingDto } from './dto/create-listing.dto';

@Injectable()
export class ListingsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(ownerId: string, dto: CreateListingDto) {
    return this.prisma.listing.create({
      data: {
        type: dto.type,
        title: dto.title,
        description: dto.description,
        priceCents: dto.priceCents,
        cityId: dto.cityId,
        ownerId,
        published: false,
      },
      include: {
        city: true,
        owner: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        photos: true,
      },
    });
  }

  async findAll() {
    return this.prisma.listing.findMany({
      where: {
        published: true,
      },
      include: {
        city: true,
        photos: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.listing.findUnique({
      where: {
        id,
      },
      include: {
        city: true,
        owner: {
          select: {
            id: true,
            name: true,
          },
        },
        photos: true,
      },
    });
  }
}