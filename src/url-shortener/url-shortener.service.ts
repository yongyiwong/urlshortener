import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { CreateUrlShortenerDto } from './dto/create-url-shortener.dto';
import { UrlShortener } from './enitities/url-shortener.entity';

@Injectable()
export class UrlShortenerService {
  constructor(
    @InjectRepository(UrlShortener)
    private repository: Repository<UrlShortener>,
  ) {}

  create(createDto: CreateUrlShortenerDto) {
    return this.repository.save(createDto);
  }

  findAll(options?: FindManyOptions<UrlShortener>) {
    return this.repository.find(options);
  }

  findOne(options?: FindOneOptions<UrlShortener>) {
    return this.repository.findOneOrFail(options);
  }
}
