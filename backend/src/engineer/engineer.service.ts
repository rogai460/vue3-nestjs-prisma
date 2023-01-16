import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma, Engineer } from '@prisma/client';

@Injectable()
export class EngineerService {
  constructor(private prisma: PrismaService) {}

  async engineers(): Promise<Engineer[]> {
    return this.prisma.engineer.findMany({});
  }

  async engineer(engineerId: number): Promise<Engineer> {
    return this.prisma.engineer.findUnique({
      where: {
        id: Number(engineerId),
      },
      include: {
        projectHistory: {
          include: {
            project: true,
          },
        },
      },
    });
  }

  async createEngineer(data: Prisma.EngineerCreateInput): Promise<Engineer> {
    return this.prisma.engineer.create({
      data,
    });
  }

  async updateEngineer(
    engineerId: number,
    data: Prisma.EngineerUncheckedUpdateInput,
  ): Promise<Engineer> {
    console.log(engineerId);
    console.log(data);
    return this.prisma.engineer.update({
      where: {
        id: Number(engineerId),
      },
      data: data,
    });
  }
}
