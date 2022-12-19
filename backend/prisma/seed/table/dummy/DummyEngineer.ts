import { PrismaClient, Prisma } from '@prisma/client';
const prisma = new PrismaClient();

// モデル投入用のデータ定義
const insertData: Prisma.EngineerUncheckedCreateInput[] = [
  {
    id: 1,
    lastName: '山田',
    firstName: '太郎',
    lastNameKana: 'ヤマダ',
    firstNameKana: 'タロウ',
    sex: 0,
    company: '',
  },
  {
    id: 2,
    lastName: '田中',
    firstName: '次郎',
    lastNameKana: 'タナカ',
    firstNameKana: 'ジロウ',
    sex: 0,
    company: '',
  },
];

export const dummyEngineer = async () => {
  return await prisma.$transaction(
    insertData.map((i) =>
      prisma.engineer.create({
        data: i,
      }),
    ),
  );
};

// export const dummyEngineer = async () => {
//   await prisma.engineer.createMany({
//     data: insertData,
//   });
// };
