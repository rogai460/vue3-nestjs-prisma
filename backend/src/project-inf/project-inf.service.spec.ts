import { Test, TestingModule } from '@nestjs/testing';
import { ProjectInfService } from './project-inf.service';

describe('ProjectInfService', () => {
  let service: ProjectInfService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProjectInfService],
    }).compile();

    service = module.get<ProjectInfService>(ProjectInfService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
