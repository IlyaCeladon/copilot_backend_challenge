import { Module } from '@nestjs/common';
import { JsonDatabaseService } from './json-database.service';
import { ConfigService } from '@nestjs/config';

@Module({
  providers: [JsonDatabaseService, ConfigService],
  exports: [JsonDatabaseService],
})
export class JsonDatabaseModule {}
