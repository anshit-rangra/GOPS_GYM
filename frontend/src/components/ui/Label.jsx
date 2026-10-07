const Label = ({ 
  children, 
  htmlFor, 
  required = false, 
  className = '',
  ...props 
}) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`
        text-sm font-medium text-[var(--color-text-primary)]
        leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70
        ${className}
      `}
      {...props}
    >
      {children}
      {required && <span className="text-[var(--color-error)] ml-1">*</span>}
    </label>
  );
};

export default Label;
