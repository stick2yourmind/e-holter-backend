import { Prisma, PrismaClient, $Enums } from '@prisma/client';

const prisma = new PrismaClient();

async function seed(): Promise<void> {
  const initialUsers: Prisma.UserCreateManyInput[] = [
    {
      email: 'comandante@fort.com',
      username: 'comandante@fort.com',
      // pass: 123456
      password: '$2b$10$urg/FM3vis/wZzamdoBNHe.VpI6YiRy6ed/7LUrbOg1EIXgF3iAHC',
      isValidated: true,
      roles: $Enums.ROLE.ADMIN,
    },
    {
      email: 'npc@user.com',
      username: 'npc@user.com',
      // pass: 123456
      password: '$2b$10$urg/FM3vis/wZzamdoBNHe.VpI6YiRy6ed/7LUrbOg1EIXgF3iAHC',
      roles: $Enums.ROLE.USER,
    },
  ];
  await prisma.user.createMany({ data: initialUsers });
}

seed()
  .then(() => {
    console.log('database populated');
  })
  .catch((err) => {
    console.log('error while trying to populate database');
    console.log('🚀 ~ err:', err);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
