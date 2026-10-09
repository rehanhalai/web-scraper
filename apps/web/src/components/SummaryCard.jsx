import { useState } from 'react';
import { Button } from './ui/Button.jsx';

export function SummaryCard({ summary, activeUrl, onReset }) {
  const [copied, setCopied] = useState(false);

  if (!summary) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <article className="summary-result-card" aria-label="Generated Summary">
      <div className="summary-header">
        <div className="summary-title-area">
          <h3 className="summary-title">Executive Brief</h3>
          {activeUrl && (
            <a
              href={activeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="summary-source-url"
              title={activeUrl}
            >
              {activeUrl}
            </a>
          )}
        </div>
        <div className="summary-actions">
          <Button variant="secondary-sage" onClick={handleCopy}>
            {copied ? '✓ Copied' : 'Copy text'}
          </Button>
        </div>
      </div>

      <div className="summary-content" id="summary-text-display">
        {summary}
      </div>

      <div className="summary-footer">
        <span>Synthesized via Gemini AI</span>
        <Button variant="text" onClick={onReset}>
          Clear and start over
        </Button>
      </div>
    </article>
  );
}

export default SummaryCard;
