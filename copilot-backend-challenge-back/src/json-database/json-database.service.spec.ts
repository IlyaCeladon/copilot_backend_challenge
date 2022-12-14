import { Test, TestingModule } from '@nestjs/testing';
import { JsonDatabaseService } from './json-database.service';

describe('JsonDatabaseService', () => {
  let service: JsonDatabaseService;

  const mockJsonDatabaseService = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JsonDatabaseService],
    })
      .overrideProvider(JsonDatabaseService)
      .useValue(mockJsonDatabaseService)
      .compile();

    service = module.get<JsonDatabaseService>(JsonDatabaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
