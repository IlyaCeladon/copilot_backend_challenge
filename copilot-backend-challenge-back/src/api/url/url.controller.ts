import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { UrlService } from './url.service';
import { GetAnswerDto, GetUrlDto, PostUrlDto } from '../../dto/url.dto';

@Controller()
export class UrlController {
  constructor(private urlService: UrlService) {}

  @Post('url')
  generateUrl(@Body() body: PostUrlDto) {
    try {
      return this.urlService.generateUrl(body);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.CONFLICT);
    }
  }

  @Get('/:shortenedURL')
  getUrl(@Param() url: GetUrlDto) {
    try {
      return this.urlService.getUrl(url);
    } catch (e) {
      throw new HttpException(e.members, HttpStatus.CONFLICT);
    }
  }

  @Post('/send-answer')
  @HttpCode(HttpStatus.OK)
  sendAnswer(@Body() body: GetAnswerDto) {
    try {
      return this.urlService.sendAnswer(body);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.CONFLICT);
    }
  }
}
