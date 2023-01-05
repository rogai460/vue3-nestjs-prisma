import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma, Project, ProjectHistory } from '@prisma/client';
import { beginningMonthDay, endMonthDay } from '../util/dateUtil';

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
  id: number;
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

  async projects(): Promise<Project[]> {
    return this.prisma.project.findMany({});
  }

  async historyUnique(historyId: number): Promise<ProjectHistory> {
    return this.prisma.projectHistory.findUnique({
      where: {
        id: Number(historyId),
      },
      include: {
        project: true,
        engineer: true,
      },
    });
  }

  async history(year: number, month: number): Promise<ProjectResponse[]> {
    const findProject = this.prisma.project.findMany({
      select: {
        id: true,
        projectNameMask: true,
        projectName: true,
        startDate: true,
        endDate: true,
        endUser: true,
        projectHistory: {
          select: {
            id: true,
            startDate: true,
            endDate: true,
            sales: true,
            cost: true,
            engineerId: true,
            engineer: {
              select: {
                lastName: true,
                firstName: true,
                lastNameKana: true,
                firstNameKana: true,
                employeeCategory: true,
                laborCost: true,
                sex: true,
                company: true,
              },
            },
          },
          where: {
            startDate: {
              lte: endMonthDay(year, month),
            },
            OR: [
              {
                endDate: {
                  gte: beginningMonthDay(year, month),
                },
              },
              {
                endDate: {
                  equals: null,
                },
              },
            ],
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
        id: ph.id,
        startDate: ph.startDate,
        endDate: ph.endDate,
        sales: ph.sales,
        cost:
          ph.engineer.employeeCategory === 0 ? ph.engineer.laborCost : ph.cost,
        engineerId: ph.engineerId,
        lastName: ph.engineer.lastName,
        firstName: ph.engineer.firstName,
        lastNameKana: ph.engineer.lastNameKana,
        firstNameKana: ph.engineer.firstNameKana,
        sex: ph.engineer.sex == 0 ? '男性' : '女性',
        company: ph.engineer.company,
      })),
    }));
  }

  async createHistory(
    data: Prisma.ProjectHistoryUncheckedCreateInput,
  ): Promise<ProjectHistory> {
    return this.prisma.projectHistory.create({
      data,
    });
  }

  async updateHistory(
    projectHistoryId: number,
    data: Prisma.ProjectHistoryUncheckedUpdateInput,
  ): Promise<ProjectHistory> {
    return this.prisma.projectHistory.update({
      where: {
        id: Number(projectHistoryId),
      },
      data: data,
    });
  }
}
