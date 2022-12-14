import { Test, TestingModule } from '@nestjs/testing';
import { UrlController } from './url.controller';
import { UrlService } from './url.service';
import { uid } from 'uid';

describe('UrlController', () => {
  let controller: UrlController;
  const mockUrlService = {
    generateUrl: jest.fn((dto) => {
      return { data: 'ok' };
    }),
    getUrl: jest.fn((dto) => {
      return { url: 'example.com' };
    }),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UrlController],
      providers: [UrlService],
    })
      .overrideProvider(UrlService)
      .useValue(mockUrlService)
      .compile();

    controller = module.get<UrlController>(UrlController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should be create a shortened link', () => {
    expect(controller.generateUrl({ url: 'example.com' })).toEqual({
      data: 'ok',
    });
  });

  it('should be get url by shortened link', () => {
    expect(controller.getUrl({ shortenedURL: uid() })).toEqual({
      url: 'example.com',
    });
  });
});
