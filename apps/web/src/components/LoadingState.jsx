export function LoadingState() {
  return (
    <div className="loading-box" role="status" aria-live="polite">
      <div className="calm-pulse-dot" />
      <div>
        <div className="loading-text-title">Brewing your summary…</div>
        <div className="loading-text-sub">
          Visiting page, extracting core content, and compiling key takeaways.
        </div>
      </div>
    </div>
  );
}

export default LoadingState;
