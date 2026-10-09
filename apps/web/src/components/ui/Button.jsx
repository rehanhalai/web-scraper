/**
 * Reusable button component adhering to the warm design system
 * Variants:
 *  - 'coral': Solid warm coral for primary actions
 *  - 'nav-sage': Sage green pill for navigation
 *  - 'secondary-sage': Soft sage green pill for secondary actions (e.g., copy)
 *  - 'text': Simple inline text button (e.g., reset)
 */
export function Button({
  children,
  variant = 'coral',
  type = 'button',
  onClick,
  disabled = false,
  id,
  className = '',
  ...props
}) {
  const variantClassMap = {
    coral: 'btn-primary-coral',
    'nav-sage': 'btn-nav-sage',
    'secondary-sage': 'btn-secondary-sage',
    text: 'btn-text-reset',
  };

  const selectedClass = variantClassMap[variant] || 'btn-primary-coral';

  return (
    <button
      id={id}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${selectedClass} ${className}`.trim()}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
