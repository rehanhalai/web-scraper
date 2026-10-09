import { useState } from 'react';
import './App.css';

const SAMPLE_URLS = [
  { label: 'Wikipedia: Artificial Intelligence', url: 'https://en.wikipedia.org/wiki/Artificial_intelligence' },
  { label: 'Wikipedia: Web Scraping', url: 'https://en.wikipedia.org/wiki/Web_scraping' },
  { label: 'Node.js About', url: 'https://nodejs.org/en/about' },
];

function App() {
  const [url, setUrl] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [activeUrl, setActiveUrl] = useState('');

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!url.trim()) return;

    setLoading(true);
    setError('');
    setSummary('');
    setActiveUrl(url.trim());

    try {
      const response = await fetch('http://localhost:3000/scraper/summarize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: url.trim() }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to scrape and summarize webpage.');
      }

      setSummary(data.summary);
    } catch (err) {
      setError(
        err.message || 'Network error: ensure the backend API is running on http://localhost:3000'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!summary) return;
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSelectSample = (sampleUrl) => {
    setUrl(sampleUrl);
  };

  return (
    <div className="app-container">
      {/* Header */}
      <header className="header">
        <div className="badge-pill">
          <span className="badge-dot" />
          <span>Full-Stack AI Scraper</span>
        </div>
        <h1 className="title">
          Webpage <span className="title-gradient">Summarizer</span>
        </h1>
        <p className="subtitle">
          Extract the essential content from any public web page and generate an instant AI executive brief.
        </p>
      </header>

      {/* Input Form Card */}
      <main>
        <section className="glass-card" aria-label="URL Input Section">
          <form className="scraper-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <div className="input-wrapper">
                <span className="input-icon">🔗</span>
                <input
                  id="url-input"
                  type="url"
                  className="url-input"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://example.com/article"
                  required
                  autoFocus
                />
                {url && (
                  <button
                    type="button"
                    className="clear-btn"
                    onClick={() => setUrl('')}
                    title="Clear URL"
                    aria-label="Clear URL"
                  >
                    ✕
                  </button>
                )}
              </div>
              <button
                id="summarize-btn"
                type="submit"
                className="submit-btn"
                disabled={loading || !url.trim()}
              >
                {loading ? (
                  <>
                    <span>Processing</span>
                    <span>⏳</span>
                  </>
                ) : (
                  <>
                    <span>Summarize</span>
                    <span>✨</span>
                  </>
                )}
              </button>
            </div>

            {/* Quick Sample Links */}
            <div className="samples-container">
              <span className="samples-label">Try a sample:</span>
              {SAMPLE_URLS.map((sample, idx) => (
                <button
                  key={idx}
                  type="button"
                  className="sample-chip"
                  onClick={() => handleSelectSample(sample.url)}
                >
                  {sample.label}
                </button>
              ))}
            </div>
          </form>
        </section>

        {/* Loading State */}
        {loading && (
          <div className="glass-card loading-box" role="status" aria-live="polite">
            <div className="spinner" />
            <div>
              <div className="loading-title">Extracting &amp; Summarizing Content…</div>
              <p className="loading-desc">
                Fetching HTML, stripping boilerplate markup, and generating a synthesis with Gemini AI.
              </p>
            </div>
          </div>
        )}

        {/* Error Alert */}
        {error && (
          <div className="error-box" role="alert">
            <span className="error-icon">⚠️</span>
            <div>
              <div className="error-title">Summarization Error</div>
              <div className="error-message">{error}</div>
            </div>
          </div>
        )}

        {/* Summary Result Card */}
        {summary && !loading && (
          <section className="glass-card result-card" aria-label="AI Summary Results">
            <div className="result-header">
              <div className="result-title-group">
                <div className="result-heading">
                  <span>AI Executive Summary</span>
                  <span className="ai-badge">✦ Gemini AI</span>
                </div>
                {activeUrl && (
                  <a
                    href={activeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="source-link"
                    title={activeUrl}
                  >
                    Source: {activeUrl} ↗
                  </a>
                )}
              </div>
              <div className="actions-group">
                <button
                  type="button"
                  id="copy-summary-btn"
                  className="icon-btn"
                  onClick={handleCopy}
                  title="Copy to clipboard"
                >
                  {copied ? '✓ Copied' : '📋 Copy Summary'}
                </button>
              </div>
            </div>

            <div className="summary-body" id="summary-content">
              {summary}
            </div>

            <div className="result-footer">
              <span>Ready for another analysis? Paste a new URL above.</span>
              <button
                type="button"
                className="icon-btn"
                onClick={() => {
                  setSummary('');
                  setUrl('');
                }}
              >
                Clear
              </button>
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>Full-Stack Monorepo • React (Vite) + NestJS + Google Gemini</p>
      </footer>
    </div>
  );
}

export default App;
