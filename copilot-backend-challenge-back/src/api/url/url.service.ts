import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JsonDatabaseService } from '../../json-database/json-database.service';
import { uid } from 'uid/secure';
import { AppConfigService } from '../../app-config/app-config.service';
import axios from 'axios';
import { GetAnswerDto, GetUrlDto, PostUrlDto } from '../../dto/url.dto';
@Injectable()
export class UrlService {
  constructor(
    private jsonDatabaseService: JsonDatabaseService,
    private appConfig: AppConfigService,
  ) {}

  async generateUrl({ url }: PostUrlDto) {
    // Checking for data transmission
    if (!url) {
      throw new HttpException('Url was not passed', HttpStatus.CONFLICT);
    }

    // Creating a shortened link
    const hash = uid();

    //Saving information
    await this.jsonDatabaseService.create({
      url: [{ [hash]: { url }, client: false }],
    });

    // Send information to the client
    axios
      .post(this.appConfig.clientUrl, {
        shortenedURL: this.appConfig.backUrl + hash,
      })
      .then((data) => {
        // We check the response from the client, if the response is positive, then we note that the client has received the information
        if (data.status === 200) {
          this.jsonDatabaseService.update(hash, {
            url: [{ [hash]: { url }, client: true }],
          });
        }
      })
      .catch(() => {
        // If the answer is negative, we hang the attempt to send to the cron
        console.log(
          'The response from the client has not arrived, the cron will send the information to the client until he receives a response from him',
        );
      });
    return { data: 'ok' };
  }

  async getUrl({ shortenedURL }: GetUrlDto) {
    // We find the query in the table and return the answer
    const item = await this.jsonDatabaseService.findUrl(shortenedURL);

    if (!item) {
      throw new HttpException('Item not found', HttpStatus.NOT_FOUND);
    }

    return { url: item[shortenedURL].url };
  }

  async sendAnswer({ shortenedURL }: GetAnswerDto) {
    // We note that the client has received a request
    const hash = shortenedURL.split('/');

    const item = await this.jsonDatabaseService.findUrl(hash[hash.length - 1]);

    if (!item) {
      throw new HttpException('Item not found', HttpStatus.NOT_FOUND);
    }

    await this.jsonDatabaseService.update(hash[hash.length - 1], {
      url: [{ ...item, client: true }],
    });

    return { data: 'ok' };
  }
}
