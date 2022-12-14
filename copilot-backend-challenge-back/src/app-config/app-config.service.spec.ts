import { Test, TestingModule } from '@nestjs/testing';
import { AppConfigService } from './app-config.service';

describe('ConfigService', () => {
  let service: AppConfigService;
  const mockAppConfigService = {};
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppConfigService],
    })
      .overrideProvider(AppConfigService)
      .useValue(mockAppConfigService)
      .compile();

    service = module.get<AppConfigService>(AppConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
