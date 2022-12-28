import { Controller, Get, Query, Param, Post, Body } from '@nestjs/common';
import { EngineerService as EngineerService } from './engineer.service';
import { Engineer } from '@prisma/client';

export interface EngineerInput {
  lastName: string;
  firstName: string | null;
  lastNameKana: string | null;
  firstNameKana: string | null;
  sex: number | null;
  employeeId: number | null;
  employeeCategory: number | null;
  laborCost: number | null;
  company: string | null;
}

@Controller('engineer')
export class EngineerController {
  constructor(private readonly engineerService: EngineerService) {}

  @Get(':engineerId')
  async engineer(@Param('engineerId') engineerId: number): Promise<Engineer> {
    return this.engineerService.engineer(engineerId);
  }

  @Get()
  async engineers(): Promise<Engineer[]> {
    return this.engineerService.engineers();
  }

  @Post('create')
  async createEngineers(@Body() postData: EngineerInput): Promise<Engineer> {
    return this.engineerService.createEngineer({
      lastName: postData.lastName,
      firstName: postData.firstName,
      lastNameKana: postData.lastNameKana,
      firstNameKana: postData.firstNameKana,
      sex: postData.sex,
      employeeCategory: postData.employeeCategory,
      laborCost: postData.laborCost,
      company: postData.company,
    });
  }
}
