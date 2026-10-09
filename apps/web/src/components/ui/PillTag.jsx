/**
 * Reusable hairline-bordered pill tag
 * Variants: 'default' | 'sage' | 'coral'
 */
export function PillTag({ children, variant = 'default', className = '' }) {
  const variantClass = variant === 'default' ? '' : variant;
  return (
    <span className={`pill-tag ${variantClass} ${className}`.trim()}>
      {children}
    </span>
  );
}

export default PillTag;
