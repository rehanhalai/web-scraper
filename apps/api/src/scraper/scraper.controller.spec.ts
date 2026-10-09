import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ScraperController } from './scraper.controller.js';
import { ScraperService } from './scraper.service.js';

describe('ScraperController', () => {
  let controller: ScraperController;
  let service: ScraperService;

  beforeEach(() => {
    service = {
      scrapeAndSummarize: vi.fn().mockResolvedValue({
        url: 'https://example.com',
        textLength: 100,
        summary: 'Example summary',
      }),
    } as any;
    controller = new ScraperController(service);
  });

  it('should call scraperService with provided url', async () => {
    const result = await controller.summarize({ url: 'https://example.com' });
    expect(service.scrapeAndSummarize).toHaveBeenCalledWith('https://example.com');
    expect(result).toEqual({
      url: 'https://example.com',
      textLength: 100,
      summary: 'Example summary',
    });
  });
});
