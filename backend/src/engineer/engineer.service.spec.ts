import { Test, TestingModule } from '@nestjs/testing';
import { EngineerService } from './engineer.service';

describe('EngineerService', () => {
  let service: EngineerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EngineerService],
    }).compile();

    service = module.get<EngineerService>(EngineerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
