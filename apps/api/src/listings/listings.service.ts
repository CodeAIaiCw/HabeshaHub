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
  const listings = await this.prisma.listing.findMany();

  console.log('=== Listings from Prisma ===');
  console.log(JSON.stringify(listings, null, 2));

  return listings;
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

async publish(id: string, ownerId: string) {
  const listing = await this.prisma.listing.findFirst({
    where: {
      id,
      ownerId,
    },
  });

  if (!listing) {
    throw new Error('Listing not found.');
  }

  return this.prisma.listing.update({
    where: {
      id,
    },
    data: {
      published: true,
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
}