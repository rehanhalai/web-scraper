import { PillTag } from './ui/PillTag.jsx';

const SAMPLE_PAGES = [
  {
    title: 'Artificial Intelligence',
    source: 'Wikipedia',
    url: 'https://en.wikipedia.org/wiki/Artificial_intelligence',
  },
  {
    title: 'Web Scraping Overview',
    source: 'Wikipedia',
    url: 'https://en.wikipedia.org/wiki/Web_scraping',
  },
  {
    title: 'About Node.js Architecture',
    source: 'Node.js Docs',
    url: 'https://nodejs.org/en/about',
  },
];

export function HeroCopy({ onSelectSample }) {
  return (
    <section className="hero-copy-column">
      <div>
        <PillTag variant="sage">Calm web reading</PillTag>
      </div>

      <h1 className="hero-heading">
        Distill long articles into clear, gentle insights.
      </h1>

      <p className="hero-description">
        Skip the intrusive banners, paywalls, and clutter. Paste any public article
        or documentation link to extract the pure text and receive an intentional,
        coherent synthesis.
      </p>

      <div className="hero-commitments">
        <PillTag>No trackers scraped</PillTag>
        <PillTag>Pure text extraction</PillTag>
        <PillTag variant="coral">Gemini 2.5 Flash</PillTag>
      </div>

      {/* Sample Links */}
      <div className="sample-prompts-section">
        <span className="sample-label">Try an example link:</span>
        <div className="samples-list">
          {SAMPLE_PAGES.map((sample, idx) => (
            <button
              key={idx}
              type="button"
              className="sample-item-btn"
              onClick={() => onSelectSample(sample.url)}
            >
              <span>
                <strong>{sample.title}</strong> — {sample.source}
              </span>
              <span className="sample-arrow">Select →</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HeroCopy;
