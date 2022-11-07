import { Body, Controller, Get, Param, Post, Redirect } from '@nestjs/common';
import { CreateUrlShortenerDto } from './dto/create-url-shortener.dto';
import { UrlShortenerService } from './url-shortener.service';
import { ApiTags } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';

@Controller('shortener')
@ApiTags('Url Shortener')
export class UrlShortenerController {
  constructor(private readonly urlShortenerService: UrlShortenerService) {}

  /*
   * Create Shorten Url
   */
  @Post()
  @Throttle(100, 60)
  async create(@Body() { origin }: CreateUrlShortenerDto) {
    return this.urlShortenerService.create({
      origin: /^http(s)?:\/\//.test(origin) ? origin : `https://${origin}`,
    });
  }

  /*
   * Redirect Shorten Url to Origin
   */
  @Get(':shorten')
  @Redirect('', 301)
  @Throttle(1000, 60)
  async get(@Param('shorten') shorten: string) {
    const url = await this.urlShortenerService.get(shorten);
    return { url };
  }
}
