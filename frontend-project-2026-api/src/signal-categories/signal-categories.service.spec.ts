import { Test, TestingModule } from '@nestjs/testing';
import { SignalCategoriesService } from './signal-categories.service';

describe('SignalCategoriesService', () => {
  let service: SignalCategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SignalCategoriesService],
    }).compile();

    service = module.get<SignalCategoriesService>(SignalCategoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
