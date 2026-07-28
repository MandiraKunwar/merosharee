import { PrismaClient } from "../app/generated/prisma";

const prisma = new PrismaClient();

async function main() {
  // 1. Create a sample Depository Participant (e.g., NIC Asia Capital or similar)
  const dp = await prisma.depositoryParticipant.upsert({
    where: { code: "13000" },
    update: {},
    create: {
      code: "13000",
      name: "13000 - NIC Asia Capital Limited",
    },
  });

  // 2. Create a test user matching the form fields
  await prisma.user.upsert({
    where: { username: "johndoe123" },
    update: {},
    create: {
      username: "johndoe123",
      email: "john@example.com",
      dateOfBirth: "01/15/1995",
      dpCode: dp.code,
    },
  });

  console.log("Database has been seeded with test data!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });