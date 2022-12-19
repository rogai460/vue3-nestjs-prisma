import { Module } from '@nestjs/common';
import { ProjectInfService } from './project-inf.service';
import { ProjectInfController } from './project-inf.controller';

@Module({
  providers: [ProjectInfService],
  controllers: [ProjectInfController]
})
export class ProjectInfModule {}
