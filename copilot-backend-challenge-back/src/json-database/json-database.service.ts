import { Injectable } from '@nestjs/common';
import { JsonDB, Config } from 'node-json-db';
import { AppConfigService } from '../app-config/app-config.service';

@Injectable()
export class JsonDatabaseService {
  private JsonDatabase: JsonDB;
  constructor(private appConfigService: AppConfigService) {
    this.JsonDatabase = new JsonDB(
      new Config(this.appConfigService.dataBasePath, true, false, '/'),
    );
  }

  async create(data) {
    await this.JsonDatabase.push('/', data, false);
    return this.JsonDatabase.save();
  }

  async update(hash, data) {
    await this.JsonDatabase.reload();
    await this.JsonDatabase.delete(
      `/url[${await this.JsonDatabase.getIndex('/url', hash)}]`,
    );
    return this.JsonDatabase.push('/', data, false);
  }

  async findUrl(data) {
    await this.JsonDatabase.reload();
    return (await this.JsonDatabase.getData('/url')).find((item) => item[data]);
  }

  async getNoResponseClient() {
    await this.JsonDatabase.reload();
    return (await this.JsonDatabase.getData('/url')).filter(
      (item) => item.client === false,
    );
  }
}
