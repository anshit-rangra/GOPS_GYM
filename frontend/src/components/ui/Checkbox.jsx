const Checkbox = ({ 
  label, 
  id, 
  name, 
  checked, 
  onChange, 
  error, 
  required = false,
  disabled = false,
  className = '',
  ...props 
}) => {
  return (
    <div className={`flex items-start gap-3 ${className}`}>
      <div className="flex items-center h-5 mt-0.5">
        <input
          type="checkbox"
          id={id || name}
          name={name}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          required={required}
          className={`
            w-4 h-4
            rounded border-[var(--color-border)]
            bg-[var(--color-bg-primary)]
            text-[var(--color-primary)]
            focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:ring-offset-0
            transition-colors duration-200
            disabled:cursor-not-allowed disabled:opacity-60
            ${error ? 'border-[var(--color-error)]' : ''}
          `}
          {...props}
        />
      </div>
      {label && (
        <label 
          htmlFor={id || name} 
          className="text-sm text-[var(--color-text-secondary)] cursor-pointer"
        >
          {label}
          {required && <span className="text-[var(--color-error)] ml-1">*</span>}
        </label>
      )}
    </div>
  );
};

export default Checkbox;
