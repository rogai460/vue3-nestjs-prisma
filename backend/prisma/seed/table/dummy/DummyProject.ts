import { PrismaClient, Prisma } from '@prisma/client';
const prisma = new PrismaClient();

// モデル投入用のデータ定義
const insertData: Prisma.ProjectUncheckedCreateInput[] = [
  {
    id: 1,
    projectNameMask: 'Y案件',
    projectName: '山田商店自動決済プロジェクト',
    startDate: new Date(2017, 8, 24),
    endDate: null,
    endUser: '山田商店',
  },
];

export const dummyProject = async () => {
  return await prisma.$transaction(
    insertData.map((i) =>
      prisma.project.create({
        data: i,
      }),
    ),
  );
};
