import { Test, TestingModule } from '@nestjs/testing';
import { ScheduleService } from './schedule.service';

describe('ScheduleService', () => {
  let service: ScheduleService;
  const mockScheduleService = {};
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScheduleService],
    })
      .overrideProvider(ScheduleService)
      .useValue(mockScheduleService)
      .compile();

    service = module.get<ScheduleService>(ScheduleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
