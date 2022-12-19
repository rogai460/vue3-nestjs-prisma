import { PrismaClient, Prisma } from '@prisma/client';
const prisma = new PrismaClient();

// モデル投入用のデータ定義
const insertData: Prisma.ProjectHistoryUncheckedCreateInput[] =
  [
    {
      startDate: new Date(2017, 8, 24),
      endDate: null,
      sales: 100,
      cost: 50,
      projectId: 1,
      engineerId: 1,
    },
    {
      startDate: new Date(2017, 8, 24),
      endDate: null,
      sales: 100,
      cost: 50,
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
