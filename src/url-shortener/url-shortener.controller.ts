import { Controller } from '@nestjs/common';
import { UrlShortenerService } from './url-shortener.service';

@Controller('url-shortener')
export class UrlShortenerController {
  constructor(private readonly urlShortenerService: UrlShortenerService) {}
}
