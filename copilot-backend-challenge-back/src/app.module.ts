import { Global, Module } from '@nestjs/common';
import { UrlModule } from './api/url/url.module';
import { JsonDatabaseModule } from './json-database/json-database.module';
import { AppConfigModule } from './app-config/app-config.module';
import { ScheduleModule } from './schedule/schedule.module';

@Global()
@Module({
  imports: [UrlModule, JsonDatabaseModule, AppConfigModule, ScheduleModule],
  exports: [JsonDatabaseModule, AppConfigModule],
})
export class AppModule {}
