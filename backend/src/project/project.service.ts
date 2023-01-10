import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma, Project, ProjectHistory } from '@prisma/client';
import { beginningMonthDay, endMonthDay } from '../util/dateUtil';

export interface ProjectHistoryGroupByMonth {
  label: string;
  data?: ProjectHistoryGroupBy[];
}
export interface ProjectHistoryGroupBy {
  _sum: {
    sales: number;
    cost: number;
  };
  _avg: {
    cost: number;
  };
  projectId: number;
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

  async historyGroup(
    year: number,
    month: number,
  ): Promise<ProjectHistoryGroupBy[]> {
    const group = this.prisma.projectHistory.groupBy({
      by: ['projectId'],
      _sum: {
        sales: true,
        cost: true,
      },
      _avg: {
        cost: true,
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
      // having: {
      //   _avg: {
      //     cost: true,
      //   },
      // },
      // include: {
      //   project: true,
      //   engineer: true,
      // },
    });
    return group;
  }

  async history(year: number, month: number): Promise<Project[]> {
    const a = this.prisma.project.findMany({
      include: {
        projectHistory: {
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
          include: {
            engineer: true,
          },
        },
      },
    });

    // const a = this.prisma.project.findMany({
    //   select: {
    //     id: true,
    //     projectNameMask: true,
    //     projectName: true,
    //     startDate: true,
    //     endDate: true,
    //     endUser: true,
    //     projectHistory: {
    //       select: {
    //         id: true,
    //         startDate: true,
    //         endDate: true,
    //         sales: true,
    //         cost: true,
    //         engineerId: true,
    //         engineer: {
    //           select: {
    //             lastName: true,
    //             firstName: true,
    //             lastNameKana: true,
    //             firstNameKana: true,
    //             employeeCategory: true,
    //             laborCost: true,
    //             sex: true,
    //             company: true,
    //           },
    //         },
    //       },
    //       where: {
    //         startDate: {
    //           lte: endMonthDay(year, month),
    //         },
    //         OR: [
    //           {
    //             endDate: {
    //               gte: beginningMonthDay(year, month),
    //             },
    //           },
    //           {
    //             endDate: {
    //               equals: null,
    //             },
    //           },
    //         ],
    //       },
    //     },
    //   },
    // });
    return a;
  }

  async createHistory(
    data: Prisma.ProjectHistoryUncheckedCreateInput,
  ): Promise<ProjectHistory> {
    console.log(data);
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
