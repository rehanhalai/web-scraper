import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GoogleGenAI } from '@google/genai';

@Injectable()
export class ScraperService {
  constructor(private readonly configService: ConfigService) {}

  async scrapeAndSummarize(
    targetUrl: string,
  ): Promise<{ summary: string; url: string; textLength: number }> {
    if (!targetUrl || typeof targetUrl !== 'string') {
      throw new BadRequestException('A valid webpage URL is required.');
    }

    // 1. Validate URL format
    let parsedUrl: URL;
    try {
      parsedUrl = new URL(targetUrl.trim());
      if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
        throw new Error('Invalid protocol');
      }
    } catch {
      throw new BadRequestException(
        'Invalid URL. Please provide a valid HTTP or HTTPS URL (e.g. https://example.com).',
      );
    }

    // 2. Fetch webpage HTML using Node's native fetch
    let html = '';
    try {
      const response = await fetch(parsedUrl.toString(), {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          Accept:
            'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        },
        signal: AbortSignal.timeout(15000),
      });

      if (!response.ok) {
        throw new Error(
          `Website responded with HTTP status ${response.status} (${response.statusText})`,
        );
      }

      html = await response.text();
    } catch (error: any) {
      const msg =
        error.name === 'TimeoutError'
          ? 'Webpage fetch timed out after 15 seconds.'
          : error.message;
      throw new BadRequestException(`Failed to scrape webpage: ${msg}`);
    }

    // 3. Extract text content: strip scripts, styles, and markup without external libraries
    const cleanText = this.extractTextFromHtml(html);

    if (!cleanText || cleanText.length < 20) {
      throw new BadRequestException(
        'Could not extract sufficient text content from this page. It may be heavily JavaScript-rendered or protected.',
      );
    }

    // Limit text sample to ~6,000 chars to avoid exceeding token limits while preserving key info
    const trimmedText = cleanText.slice(0, 6000);

    // 4. Summarize with Gemini AI API
    const apiKey =
      this.configService.get<string>('GEMINI_API_KEY') ||
      process.env.GEMINI_API_KEY;

    if (!apiKey || apiKey.trim() === '') {
      return {
        url: targetUrl,
        textLength: cleanText.length,
        summary:
          `[Scraping Successful] Successfully extracted ${cleanText.length} characters from ${targetUrl}.\n\n` +
          `To enable AI summarization, please add your Gemini API key to apps/api/.env (GEMINI_API_KEY=your_key).\n\n` +
          `Preview of extracted text:\n"${trimmedText.slice(0, 450)}..."`,
      };
    }

    const summary = await this.callGeminiApi(trimmedText, apiKey);

    return {
      url: targetUrl,
      textLength: cleanText.length,
      summary,
    };
  }

  private extractTextFromHtml(html: string): string {
    return (
      html
        // Remove script, style, noscript, and svg tags with their contents
        .replace(
          /<(?:script|style|noscript|svg)[\s\S]*?<\/(?:script|style|noscript|svg)>/gi,
          ' ',
        )
        // Remove comments
        .replace(/<!--[\s\S]*?-->/g, ' ')
        // Remove all remaining HTML tags
        .replace(/<[^>]+>/g, ' ')
        // Decode common HTML entities
        .replace(/&nbsp;/gi, ' ')
        .replace(/&amp;/gi, '&')
        .replace(/&lt;/gi, '<')
        .replace(/&gt;/gi, '>')
        .replace(/&quot;/gi, '"')
        .replace(/&#39;/gi, "'")
        // Normalize whitespace
        .replace(/\s+/g, ' ')
        .trim()
    );
  }

  private async callGeminiApi(
    textContent: string,
    apiKey: string,
  ): Promise<string> {
    const prompt =
      'You are an executive research assistant. Please read the following webpage content and provide a concise, high-quality 3 to 5 sentence summary capturing the key points, themes, and takeaways:\n\n' +
      textContent;

    try {
      const ai = new GoogleGenAI({ apiKey });

      const interaction = await ai.interactions.create({
        model: 'gemini-2.5-flash',
        input: prompt,
      });

      const summary = interaction.output_text;

      if (!summary) {
        throw new Error('Gemini API did not return output text.');
      }

      return summary.trim();
    } catch (err: any) {
      throw new InternalServerErrorException(
        `AI Summarization error: ${err.message}`,
      );
    }
  }
}
