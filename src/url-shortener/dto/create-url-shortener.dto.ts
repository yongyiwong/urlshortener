import { UrlShortener } from '../enitities/url-shortener.entity';
import { PickType } from '@nestjs/swagger';

export class CreateUrlShortenerDto extends PickType(UrlShortener, ['origin']) {}
