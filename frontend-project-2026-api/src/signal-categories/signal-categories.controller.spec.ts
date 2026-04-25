import { Test, TestingModule } from '@nestjs/testing';
import { SignalCategoriesController } from './signal-categories.controller';

describe('SignalCategoriesController', () => {
  let controller: SignalCategoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SignalCategoriesController],
    }).compile();

    controller = module.get<SignalCategoriesController>(SignalCategoriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
