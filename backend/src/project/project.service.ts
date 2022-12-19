import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

export interface ProjectResponse {
  projectId: number;
  projectNameMask: string;
  projectName: string;
  startDate: Date;
  endDate: Date | null;
  endUser: string;
  projectHistory: ProjectHistoryResponse[];
}

export interface ProjectHistoryResponse {
  startDate: Date;
  endDate: Date | null;
  engineerId: number;
  sales: number;
  cost: number;
  lastName: string;
  firstName: string | null;
  lastNameKana: string | null;
  firstNameKana: string | null;
  sex: string | null;
  company: string | null;
}

@Injectable()
export class ProjectService {
  constructor(private prisma: PrismaService) {}

  async history(): Promise<ProjectResponse[]> {
    const findProject = this.prisma.project.findMany({
      include: {
        projectHistory: {
          include: {
            engineer: {
              select: {
                lastName: true,
                firstName: true,
                lastNameKana: true,
                firstNameKana: true,
                sex: true,
                company: true,
              },
            },
          },
        },
      },
    });

    return (await findProject).map((fp) => ({
      projectId: fp.id,
      projectNameMask: fp.projectNameMask,
      projectName: fp.projectName,
      startDate: fp.startDate,
      endDate: fp.endDate,
      endUser: fp.endUser,
      projectHistory: fp.projectHistory.map((ph) => ({
        startDate: ph.startDate,
        endDate: ph.endDate,
        sales: ph.sales,
        cost: ph.cost,
        engineerId: ph.engineerId,
        lastName: ph.engineer.lastName,
        firstName: ph.engineer.firstName,
        lastNameKana: ph.engineer.lastNameKana,
        firstNameKana: ph.engineer.firstNameKana,
        sex: ph.engineer.sex == 0 ? '男' : '女',
        company: ph.engineer.company,
      })),
    }));
  }
}