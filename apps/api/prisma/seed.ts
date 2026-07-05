import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.city.createMany({
    data: [
      {
        name: 'Washington DC / DMV',
        region: 'DC-MD-VA',
        country: 'USA',
        slug: 'dmv',
      },
      {
        name: 'Toronto',
        region: 'Ontario',
        country: 'Canada',
        slug: 'toronto',
      },
      {
        name: 'Seattle',
        region: 'Washington',
        country: 'USA',
        slug: 'seattle',
      },
      {
        name: 'Minneapolis–Saint Paul',
        region: 'Minnesota',
        country: 'USA',
        slug: 'minneapolis',
      },
      {
        name: 'Calgary',
        region: 'Alberta',
        country: 'Canada',
        slug: 'calgary',
      },
      {
        name: 'Edmonton',
        region: 'Alberta',
        country: 'Canada',
        slug: 'edmonton',
      },
    ],
    skipDuplicates: true,
  });

  console.log('✅ Cities seeded');
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });