import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { CreateUrlShortenerDto } from './dto/create-url-shortener.dto';
import { UrlShortener } from './enitities/url-shortener.entity';
import { ConfigService } from '@nestjs/config';
import { nanoid } from 'nanoid';

@Injectable()
export class UrlShortenerService {
  constructor(
    @InjectRepository(UrlShortener)
    private repository: Repository<UrlShortener>,

    private configService: ConfigService,
  ) {}

  /*
   * Create Shorten Url for origin
   */
  public async create({ origin }: CreateUrlShortenerDto) {
    let item = await this.findOne({
      where: {
        origin,
      },
    });

    if (item) {
      return this.getRedirectableByShorten(item.shorten);
    }

    let shorten: string;
    const size = this.configService.get<number>('SHORTEN_URL_SIZE');
    while (true) {
      shorten = nanoid(size);
      item = await this.findOne({ where: { shorten } });
      if (!item) {
        break;
      }
    }

    item = await this.repository.save({ origin, shorten });

    return this.getRedirectableByShorten(item.shorten);
  }

  /*
   * Get origin by shorten
   */
  public async get(shorten: string) {
    const item = await this.findOne({ where: { shorten } });
    if (!item) {
      throw new NotFoundException('Not found');
    }

    return item.origin;
  }

  /*
   * Find Redirectable shorten records
   */
  public async findAll(options?: FindManyOptions<UrlShortener>) {
    return this.repository.find(options);
  }

  /*
   * Find Redirectable shorten record
   */
  public async findOne(options?: FindOneOptions<UrlShortener>) {
    return this.repository.findOne(options);
  }

  /*
   * Find Redirectable shorten record By Id
   */
  public async findById(id: string) {
    return this.repository.findOne({ where: { id } });
  }

  /*
   * Get redirectable shorten url by shorten
   */
  private async getRedirectableByShorten(shorten: string) {
    const scheme = this.configService.get('API_SCHEME');
    const host = this.configService.get('API_HOST');
    const port = +this.configService.get('API_PORT');

    return `${scheme}://${host}${
      port === 80 ? '' : `:${port}`
    }/shortener/${shorten}`;
  }
}
