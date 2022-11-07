## Url shortener api scale 

# submission url

src/url-shortener/url-shortener.controller.ts

```bash
  @Post()
  @Throttle(100, 60) // 100 requests per 60s
  async create(@Body() { origin }: CreateUrlShortenerDto) {
    ...
  }
```

# access short url

src/url-shortener/url-shortener.controller.ts

```bash
  @Get(':shorten')
  @Redirect('', 301)
  @Throttle(1000, 60) // 1000 requests per 60s
  async get(@Param('shorten') shorten: string) {
    ...
  }
```

# size of unique urls can be controlled through size of shorten url

size of shorten url is defined in env

```bash
  SHORTEN_URL_SIZE=10
```
