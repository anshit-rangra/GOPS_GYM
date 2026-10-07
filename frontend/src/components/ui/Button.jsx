const Button = ({ 
  children, 
  type = 'button', 
  variant = 'primary', 
  size = 'medium', 
  disabled = false, 
  loading = false,
  onClick, 
  className = '',
  fullWidth = false,
  ...props 
}) => {
  const baseClasses = `
    inline-flex items-center justify-center
    font-medium rounded-[var(--radius)]
    transition-all duration-200 ease-in-out
    focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:cursor-not-allowed disabled:opacity-60
    active:scale-[0.98]
    ${fullWidth ? 'w-full' : ''}
  `;

  const variants = {
    primary: `
      bg-[var(--color-primary)] text-white
      hover:bg-[var(--color-primary-dark)]
      focus:ring-[var(--color-primary)]/30
      shadow-sm hover:shadow-md
    `,
    secondary: `
      bg-[var(--color-bg-primary)] text-[var(--color-text-primary)]
      border border-[var(--color-border)]
      hover:bg-[var(--color-bg-secondary)]
      focus:ring-[var(--color-primary)]/20
    `,
    outline: `
      bg-transparent text-[var(--color-primary)]
      border border-[var(--color-primary)]
      hover:bg-[var(--color-primary)] hover:text-white
      focus:ring-[var(--color-primary)]/20
    `,
    ghost: `
      bg-transparent text-[var(--color-text-primary)]
      hover:bg-[var(--color-bg-secondary)]
      focus:ring-[var(--color-primary)]/20
    `,
    danger: `
      bg-[var(--color-error)] text-white
      hover:bg-red-600
      focus:ring-[var(--color-error)]/30
    `,
    success: `
      bg-[var(--color-success)] text-white
      hover:bg-emerald-600
      focus:ring-[var(--color-success)]/30
    `
  };

  const sizes = {
    small: 'px-3 py-1.5 text-sm gap-1.5',
    medium: 'px-5 py-2.5 text-sm gap-2',
    large: 'px-6 py-3 text-base gap-2.5',
    xl: 'px-8 py-3.5 text-base gap-2.5'
  };

  const variantClasses = variants[variant] || variants.primary;
  const sizeClasses = sizes[size] || sizes.medium;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseClasses} ${variantClasses} ${sizeClasses} ${className}`}
      {...props}
    >
      {loading && (
        <svg
          className="animate-spin h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {children}
    </button>
  );
};

export default Button;
