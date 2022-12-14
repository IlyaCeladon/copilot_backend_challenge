import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
  constructor(private configServices: ConfigService) {}

  get dataBasePath(): string {
    return './src/json-database/database/urlData';
  }

  get clientUrl(): string {
    return 'http://localhost:3000/api';
  }

  get backUrl(): string {
    return 'http://localhost:8080/';
  }
}
