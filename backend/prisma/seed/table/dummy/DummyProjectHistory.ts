import { PrismaClient, Prisma } from '@prisma/client';
const prisma = new PrismaClient();

// モデル投入用のデータ定義
const insertData: Prisma.ProjectHistoryUncheckedCreateInput[] = [
  {
    id: 1,
    startDate: new Date(2017, 8, 24),
    endDate: null,
    sales: 100,
    cost: 50,
    projectId: 1,
    engineerId: 1,
  },
  {
    id: 2,
    startDate: new Date('2022-01-01T09:00:00'),
    endDate: new Date('2022-03-31T09:00:00'),
    sales: 100,
    cost: 50,
    projectId: 1,
    engineerId: 2,
  },
  {
    id: 3,
    startDate: new Date('2022-04-01T09:00:00'),
    endDate: null,
    sales: 200,
    cost: 70,
    projectId: 1,
    engineerId: 2,
  },
];

export const dummyProjectHistory = async () => {
  return await prisma.$transaction(
    insertData.map((i) =>
      prisma.projectHistory.create({
        data: i,
      }),
    ),
  );
};
