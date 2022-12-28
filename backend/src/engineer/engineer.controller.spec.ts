import { Test, TestingModule } from '@nestjs/testing';
import { EngineerController } from './engineer.controller';

describe('EngineerController', () => {
  let controller: EngineerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EngineerController],
    }).compile();

    controller = module.get<EngineerController>(EngineerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
