import { Controller, Get, Query, Param, Post, Body } from '@nestjs/common';
import { ProjectService, ProjectResponse } from './project.service';
import { Project, ProjectHistory } from '@prisma/client';
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
  Promise<ProjectResponse[]> {
    const date = new Date();
    return this.projectService.history(
      Number(date.getFullYear()),
      Number(date.getMonth() + 1),
    );
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
      endDate: convertDate(postData.expectedEndDate),
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
