const Loader = ({
  size = 'medium',
  variant = 'spinner',
  fullscreen = false,
  label = '',
  className = '',
  ...props
}) => {
  const sizes = {
    small: 'h-4 w-4',
    medium: 'h-8 w-8',
    large: 'h-12 w-12',
    xl: 'h-16 w-16'
  };

  const sizeClasses = sizes[size] || sizes.medium;

  const spinners = {
    spinner: (
      <svg
        className={`animate-spin ${sizeClasses}`}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        aria-hidden="true"
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
    ),
    dots: (
      <div
        className={`flex items-center gap-1 ${sizeClasses}`}
        aria-hidden="true"
      >
        <span className="h-1/4 w-1/4 animate-bounce rounded-full bg-current [animation-delay:-0.3s]" />
        <span className="h-1/4 w-1/4 animate-bounce rounded-full bg-current [animation-delay:-0.15s]" />
        <span className="h-1/4 w-1/4 animate-bounce rounded-full bg-current" />
      </div>
    ),
    pulse: (
      <div
        className={`animate-pulse rounded-full bg-current ${sizeClasses}`}
        aria-hidden="true"
      />
    )
  };

  const content = (
    <div
      role="status"
      aria-label={label || 'Loading'}
      className={`flex flex-col items-center justify-center gap-3 text-primary ${className}`}
      {...props}
    >
      {spinners[variant] || spinners.spinner}
      {label && (
        <span className="text-sm text-text-secondary">
          {label}
        </span>
      )}
    </div>
  );

  if (fullscreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-bg-primary/80 backdrop-blur-sm">
        {content}
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      {content}
    </div>
  );
};

export default Loader;
