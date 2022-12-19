import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';

@Module({
  providers: [ProjectService,PrismaService],
  controllers: [ProjectController]
})
export class ProjectModule {}
