export function ErrorMessage({ message }) {
  if (!message) return null;

  return (
    <div className="error-box" role="alert">
      <div className="error-title">Notice</div>
      <div className="error-desc">{message}</div>
    </div>
  );
}

export default ErrorMessage;
