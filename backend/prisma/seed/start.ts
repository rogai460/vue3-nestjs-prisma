import { PrismaClient } from '@prisma/client';
import { dummyEngineer } from './table/dummy/DummyEngineer';
import { dummyProject } from './table/dummy/DummyProject';
import { dummyProjectHistory } from './table/dummy/DummyProjectHistory';
import { engineer } from './table/production/Engineer';
import { project } from './table/production/Project';
import { projectHistory } from './table/production/ProjectHistory';

const prisma = new PrismaClient();

async function main() {
  console.log(`Start seeding ...`);

  await prisma.projectHistory.deleteMany();
  await prisma.engineer.deleteMany();
  await prisma.project.deleteMany();


  await dummyEngineer();
  await dummyProject();
  await dummyProjectHistory();

  await engineer();
  await project();
  await projectHistory();

  console.log(`Seeding finished.`);
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
