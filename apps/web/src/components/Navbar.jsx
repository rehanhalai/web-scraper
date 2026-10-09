import { Button } from './ui/Button.jsx';
import { PillTag } from './ui/PillTag.jsx';

export function Navbar({ onNewSummaryClick }) {
  return (
    <header className="navbar">
      <div className="brand-group">
        <a href="/" className="brand-logo">
          <span className="brand-leaf">🌿</span> QuietDigest
        </a>
        <PillTag>Reader</PillTag>
      </div>
      <div className="nav-actions">
        <Button variant="nav-sage" onClick={onNewSummaryClick}>
          New Summary
        </Button>
      </div>
    </header>
  );
}

export default Navbar;
