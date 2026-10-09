import { useState } from 'react';
import './App.css';
import { Navbar } from './components/Navbar.jsx';
import { HeroCopy } from './components/HeroCopy.jsx';
import { ScraperForm } from './components/ScraperForm.jsx';
import { LoadingState } from './components/LoadingState.jsx';
import { ErrorMessage } from './components/ErrorMessage.jsx';
import { SummaryCard } from './components/SummaryCard.jsx';

const API_BASE_URL = import.meta.env.VITE_API_URL;

function App() {
  const [url, setUrl] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeUrl, setActiveUrl] = useState('');

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!url.trim()) return;

    setLoading(true);
    setError('');
    setSummary('');
    setActiveUrl(url.trim());

    try {
      const response = await fetch(`${API_BASE_URL}/scraper/summarize`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: url.trim() }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Unable to summarize this webpage.');
      }

      setSummary(data.summary);
    } catch (err) {
      setError(
        err.message ||
          `Connection error: Please ensure the NestJS backend is running on ${API_BASE_URL}`
      );
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSummary('');
    setUrl('');
    setError('');
    setActiveUrl('');
  };

  const focusInput = () => {
    const inputEl = document.getElementById('url-input-field');
    if (inputEl) inputEl.focus();
  };

  return (
    <div className="site-wrapper">
      {/* Navigation */}
      <Navbar onNewSummaryClick={focusInput} />

      {/* Asymmetric Hero */}
      <main className="hero-asymmetric">
        {/* Left Column: Reassuring Human Copy & Samples */}
        <HeroCopy onSelectSample={setUrl} />

        {/* Right Column: Functional Card & Results */}
        <section className="hero-card-column">
          <div className="functional-card">
            <div className="card-intro">
              <h2 className="card-title">Summarize a webpage</h2>
              <p className="card-subtitle">
                Enter any public HTTP or HTTPS web address.
              </p>
            </div>

            <ScraperForm
              url={url}
              setUrl={setUrl}
              onSubmit={handleSubmit}
              loading={loading}
            />

            {loading && <LoadingState />}
            <ErrorMessage message={error} />
          </div>

          {!loading && (
            <SummaryCard
              summary={summary}
              activeUrl={activeUrl}
              onReset={handleReset}
            />
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="site-footer">
        <p>QuietDigest • Minimal full-stack scraper with React and NestJS</p>
      </footer>
    </div>
  );
}

export default App;
