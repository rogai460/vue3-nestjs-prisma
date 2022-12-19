import { Test, TestingModule } from '@nestjs/testing';
import { ProjectInfController } from './project-inf.controller';

describe('ProjectInfController', () => {
  let controller: ProjectInfController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectInfController],
    }).compile();

    controller = module.get<ProjectInfController>(ProjectInfController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
