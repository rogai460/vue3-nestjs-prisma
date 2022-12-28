import { Module } from '@nestjs/common';
import { EngineerService } from './engineer.service';
import { EngineerController } from './engineer.controller';
import { PrismaService } from '../prisma.service';

@Module({
  providers: [EngineerService, PrismaService],
  controllers: [EngineerController],
})
export class EngineerModule {}
