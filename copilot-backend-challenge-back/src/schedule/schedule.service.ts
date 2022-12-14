import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { JsonDatabaseService } from '../json-database/json-database.service';
import { AppConfigService } from '../app-config/app-config.service';
import axios from 'axios';

@Injectable()
export class ScheduleService {
  constructor(
    private jsonDataBaseServer: JsonDatabaseService,
    private appConfig: AppConfigService,
  ) {}

  @Cron('5 * * * * *')
  async handleCron() {
    // We get a list of unsent data to the client and try to resend the information to the client
    const noResponse = await this.jsonDataBaseServer.getNoResponseClient();
    if (noResponse.length !== 0) {
      noResponse.map((item) => {
        const hash = Object.keys(item)[0];
        axios
          .post(this.appConfig.clientUrl, {
            shortenedURL: this.appConfig.backUrl + hash,
          })
          .then((data) => {
            if (data.status === 200) {
              this.jsonDataBaseServer.update(hash, {
                url: [{ ...item, client: true }],
              });
            }
          })
          .catch(() => {
            console.log(
              'The response from the client has not arrived, the cron will send the information to the client until he receives a response from him',
            );
          });
      });
    }
  }
}
