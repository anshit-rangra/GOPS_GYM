import { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';

const PasswordInput = ({ 
  label, 
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
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && (
        <label 
          htmlFor={id || name} 
          className="text-sm font-medium text-text-primary"
        >
          {label}
          {required && <span className="text-error ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        <input
          type={showPassword ? 'text' : 'password'}
          id={id || name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          className={`
            w-full px-4 py-2.5 pr-12
            rounded-(--radius) 
            border border-border 
            bg-bg-primary 
            text-text-primary 
            placeholder:text-text-secondary/60
            transition-all duration-200 ease-in-out
            focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary
            hover:border-primary-light
            disabled:bg-bg-secondary disabled:cursor-not-allowed disabled:opacity-60
            ${error ? 'border-error focus:ring-error/20 focus:border-error' : ''}
          `}
          {...props}
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="
            absolute right-3 top-1/2 -translate-y-1/2
            p-1.5 rounded-md
            text-text-secondary
            hover:text-text-primary hover:bg-bg-secondary
            transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-primary/20
          "
          aria-label={showPassword ? 'Hide password' : 'Show password'}
        >
          {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
        </button>
      </div>
      {error && (
        <span className="text-xs text-error">
          {error}
        </span>
      )}
    </div>
  );
};

export default PasswordInput;
