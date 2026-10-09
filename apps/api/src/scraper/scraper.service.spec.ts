import { describe, it, expect, beforeEach } from 'vitest';
import { BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ScraperService } from './scraper.service.js';

describe('ScraperService', () => {
  let service: ScraperService;
  let configService: ConfigService;

  beforeEach(() => {
    configService = new ConfigService({
      GEMINI_API_KEY: 'your_api_key_here',
    });
    service = new ScraperService(configService);
  });

  it('should throw BadRequestException for invalid URLs', async () => {
    await expect(service.scrapeAndSummarize('not-a-url')).rejects.toThrow(
      BadRequestException,
    );
    await expect(service.scrapeAndSummarize('ftp://invalid.com')).rejects.toThrow(
      BadRequestException,
    );
  });

  it('should extract clean text and return placeholder guidance when API key is not configured', async () => {
    const result = await service.scrapeAndSummarize('https://example.com');
    expect(result).toHaveProperty('url', 'https://example.com');
    expect(result).toHaveProperty('textLength');
    expect(result.textLength).toBeGreaterThan(0);
    expect(result.summary).toContain('[Scraping Successful]');
  });
});
