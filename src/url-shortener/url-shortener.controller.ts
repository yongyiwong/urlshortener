import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUrlShortenerDto } from './dto/create-url-shortener.dto';
import { UrlShortenerService } from './url-shortener.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('url-shortener')
@ApiTags('Url Shortener')
export class UrlShortenerController {
  constructor(private readonly urlShortenerService: UrlShortenerService) {}

  @Post()
  create(@Body() createDto: CreateUrlShortenerDto) {
    return this.urlShortenerService.create(createDto);
  }

  @Get()
  findAll() {
    return this.urlShortenerService.findAll();
  }
}
