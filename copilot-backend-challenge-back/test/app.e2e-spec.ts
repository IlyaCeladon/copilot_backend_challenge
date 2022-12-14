import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { JsonDatabaseService } from '../src/json-database/json-database.service';
import { AppConfigService } from '../src/app-config/app-config.service';
import { UrlModule } from '../src/api/url/url.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  const mockUrlService = {};

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UrlModule],
    })
      .overrideProvider([JsonDatabaseService, AppConfigService])
      .useValue(mockUrlService)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/url (POST)', () => {
    return request(app.getHttpServer())
      .post(`/url`)
      .send({ url: 'example.com' })
      .expect('Content-type', /json/)
      .expect(201)
      .then((response) => {
        expect(response.body).toEqual({ data: 'ok' });
      });
  });

  it('/:shortenedURL (GET)', () => {
    return request(app.getHttpServer())
      .get('/de4c48d0c97')
      .expect(200)
      .expect({ url: 'example.com' });
  });

  it('/send-answer (POST)', () => {
    return request(app.getHttpServer())
      .post('/send-answer')
      .send({ shortenedURL: 'http://localhost:8080/de4c48d0c97' })
      .expect('Content-type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual({ data: 'ok' });
      });
  });
});
