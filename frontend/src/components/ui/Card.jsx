const Card = ({ 
  children, 
  className = '', 
  variant = 'default',
  padding = 'medium',
  ...props 
}) => {
  const variants = {
    default: 'bg-[var(--color-bg-primary)] shadow-md',
    elevated: 'bg-[var(--color-bg-primary)] shadow-lg hover:shadow-xl',
    flat: 'bg-[var(--color-bg-primary)] border border-[var(--color-border)]',
    glass: 'bg-[var(--color-bg-primary)]/80 backdrop-blur-md shadow-lg'
  };

  const paddings = {
    none: 'p-0',
    small: 'p-4',
    medium: 'p-6 md:p-8',
    large: 'p-8 md:p-10'
  };

  const variantClasses = variants[variant] || variants.default;
  const paddingClasses = paddings[padding] || paddings.medium;

  return (
    <div
      className={`
        rounded-xl
        transition-all duration-300 ease-in-out
        ${variantClasses}
        ${paddingClasses}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
