import { Module } from '@nestjs/common';
import { UrlService } from './url.service';
import { UrlController } from './url.controller';
import { JsonDatabaseService } from '../../json-database/json-database.service';
import { AppConfigService } from '../../app-config/app-config.service';
import { ConfigService } from '@nestjs/config';

@Module({
  providers: [UrlService, JsonDatabaseService, AppConfigService, ConfigService],
  controllers: [UrlController],
})
export class UrlModule {}
