import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { ProjectService, ProjectResponse } from './project.service';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get('history')
  async history(): Promise<ProjectResponse[]> {
    return this.projectService.history();
  }
}
