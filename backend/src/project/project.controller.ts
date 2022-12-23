import { Controller, Get, Query, Param, Post, Body } from '@nestjs/common';
import { ProjectService, ProjectResponse } from './project.service';
import { Project } from '@prisma/client';

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
}
