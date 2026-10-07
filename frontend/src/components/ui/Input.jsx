const Input = ({ 
  label, 
  type = 'text', 
  id, 
  name, 
  value, 
  onChange, 
  placeholder, 
  error, 
  required = false,
  disabled = false,
  className = '',
  ...props 
}) => {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && (
        <label 
          htmlFor={id || name} 
          className="text-sm font-medium text-[var(--color-text-primary)]"
        >
          {label}
          {required && <span className="text-[var(--color-error)] ml-1">*</span>}
        </label>
      )}
      <input
        type={type}
        id={id || name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        className={`
          px-4 py-2.5 
          rounded-[var(--radius)] 
          border border-[var(--color-border)] 
          bg-[var(--color-bg-primary)] 
          text-[var(--color-text-primary)] 
          placeholder:text-[var(--color-text-secondary)]/60
          transition-all duration-200 ease-in-out
          focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)]
          hover:border-[var(--color-primary-light)]
          disabled:bg-[var(--color-bg-secondary)] disabled:cursor-not-allowed disabled:opacity-60
          ${error ? 'border-[var(--color-error)] focus:ring-[var(--color-error)]/20 focus:border-[var(--color-error)]' : ''}
        `}
        {...props}
      />
      {error && (
        <span className="text-xs text-[var(--color-error)] animate-pulse">
          {error}
        </span>
      )}
    </div>
  );
};

export default Input;
