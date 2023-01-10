import { Controller, Get, Query, Param, Post, Body } from '@nestjs/common';
import {
  ProjectService,
  ProjectHistoryGroupBy,
  ProjectHistoryGroupByMonth,
} from './project.service';
import { Project, ProjectHistory, Prisma } from '@prisma/client';
import { convertDate } from '../util/dateUtil';
interface ProjectHistoryPostInput {
  startDate: string;
  endDate?: string | null;
  expectedEndDate?: string | null;
  utilizationRate?: number | null;
  salesContractCompany?: string | null;
  purchaseContractCompany?: string | null;
  contractType?: number | null;
  sales: number;
  cost?: number | null;
  projectId: number;
  engineerId: number;
}
@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get()
  async projects(): Promise<Project[]> {
    return this.projectService.projects();
  }

  @Get('history')
  async history(): // @Query('year') year: number,
  // @Query('month') month: number,
  Promise<Project[]> {
    const date = new Date();
    return this.projectService.history(
      Number(date.getFullYear()),
      Number(date.getMonth() + 1),
    );
  }

  @Get('history/group')
  async historyGroup(): // @Query('year') year: number,
  // @Query('month') month: number,
  Promise<ProjectHistoryGroupBy[]> {
    const date = new Date();
    return this.projectService.historyGroup(
      Number(date.getFullYear()),
      Number(date.getMonth() + 1),
    );
  }

  @Get('history/group/month')
  async historyGroupMonth(): // @Query('year') year: number,
  // @Query('month') month: number,
  Promise<ProjectHistoryGroupByMonth[]> {
    const date = new Date();
    const argList = [
      { year: 2022, month: 9 },
      { year: 2022, month: 10 },
      { year: 2022, month: 11 },
      { year: 2022, month: 12 },
      { year: 2023, month: 1 },
      { year: 2023, month: 2 },
      { year: 2023, month: 3 },
      { year: 2023, month: 4 },
      { year: 2023, month: 5 },
      { year: 2023, month: 6 },
      { year: 2023, month: 7 },
      { year: 2023, month: 8 },
    ];

    let res = [];
    for (const arg of argList) {
      const historyGroup = this.projectService.historyGroup(
        arg.year,
        arg.month,
      );
      res = [
        ...res,
        {
          label: `${arg.year}/${String(arg.month).padStart(2, '0')}`,
          data: await historyGroup,
        },
      ];
    }

    return res;
  }

  @Get('history/:historyId')
  async engineer(
    @Param('historyId') historyId: number,
  ): Promise<ProjectHistory> {
    return this.projectService.historyUnique(historyId);
  }

  @Post('history/create')
  async createHistory(
    @Body() postData: ProjectHistoryPostInput,
  ): Promise<ProjectHistory> {
    return this.projectService.createHistory({
      startDate: convertDate(postData.startDate),
      expectedEndDate: convertDate(postData.expectedEndDate),
      utilizationRate: postData.utilizationRate,
      sales: Number(postData.sales),
      cost: Number(postData.cost),
      projectId: Number(postData.projectId),
      engineerId: Number(postData.engineerId),
    });
  }

  @Post('history/update/:historyId')
  async updateHistory(
    @Param('historyId') historyId: number,
    @Body() postData: ProjectHistoryPostInput,
  ): Promise<ProjectHistory> {
    return this.projectService.updateHistory(historyId, {
      startDate: convertDate(postData.startDate),
      expectedEndDate: convertDate(postData.expectedEndDate),
      endDate: convertDate(postData.endDate),
      utilizationRate: Number(postData.utilizationRate),
      sales: Number(postData.sales),
      cost: Number(postData.cost),
      projectId: Number(postData.projectId),
      engineerId: Number(postData.engineerId),
    });
  }
}
