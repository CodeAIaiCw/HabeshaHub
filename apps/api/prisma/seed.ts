import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const cities = [
    { name: 'Washington DC / DMV', region: 'DC-MD-VA', country: 'USA', slug: 'dmv' },
    { name: 'Toronto', region: 'Ontario', country: 'Canada', slug: 'toronto' },
    { name: 'Seattle', region: 'Washington', country: 'USA', slug: 'seattle' },
    { name: 'Minneapolis–Saint Paul', region: 'Minnesota', country: 'USA', slug: 'minneapolis' },
    { name: 'Calgary', region: 'Alberta', country: 'Canada', slug: 'calgary' },
    { name: 'Edmonton', region: 'Alberta', country: 'Canada', slug: 'edmonton' }
  ];

  for (const city of cities) {
    await prisma.city.upsert({ where: { slug: city.slug }, update: {}, create: city });
  }
}

main().finally(async () => prisma.$disconnect());
