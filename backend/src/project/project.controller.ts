import { Controller, Get, Param, Post, Body } from '@nestjs/common';
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
  async history(): Promise<ProjectResponse[]> {
    return this.projectService.history();
  }
}
