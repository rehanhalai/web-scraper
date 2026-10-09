import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ScraperService } from './scraper.service.js';

export interface SummarizeDto {
  url: string;
}

@Controller('scraper')
export class ScraperController {
  constructor(private readonly scraperService: ScraperService) {}

  @Post('summarize')
  @HttpCode(HttpStatus.OK)
  async summarize(@Body() body: SummarizeDto) {
    return this.scraperService.scrapeAndSummarize(body.url);
  }
}
