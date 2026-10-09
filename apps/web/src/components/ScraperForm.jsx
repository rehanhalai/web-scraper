import { Button } from './ui/Button.jsx';

export function ScraperForm({ url, setUrl, onSubmit, loading }) {
  return (
    <form className="scraper-form" onSubmit={onSubmit}>
      <div className="input-field-group">
        <label htmlFor="url-input-field" className="input-label">
          Webpage Address
        </label>
        <div className="input-row">
          <input
            id="url-input-field"
            type="url"
            className="url-input"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com/article"
            required
          />
          {url && (
            <button
              type="button"
              className="input-clear-btn"
              onClick={() => setUrl('')}
              aria-label="Clear URL"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      <Button
        type="submit"
        id="summarize-action-btn"
        variant="coral"
        disabled={loading || !url.trim()}
      >
        {loading ? 'Reading and synthesizing…' : 'Summarize Article'}
      </Button>
    </form>
  );
}

export default ScraperForm;
