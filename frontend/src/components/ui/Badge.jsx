const Badge = ({
  children,
  variant = "neutral",
  size = "medium",
  icon: Icon,
  className = "",
  ...props
}) => {
  const variants = {
    success: "bg-volt/12 text-volt border-volt/25",
    warning: "bg-warning/12 text-warning border-warning/25",
    danger: "bg-error/12 text-error border-error/25",
    info: "bg-primary/15 text-primary-light border-primary/25",
    neutral: "bg-panel-2 text-muted border-line",
  };

  const sizes = {
    small: "px-2 py-0.5 text-[11px] gap-1",
    medium: "px-2.5 py-1 text-xs gap-1.5",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border font-medium whitespace-nowrap ${
        variants[variant] || variants.neutral
      } ${sizes[size] || sizes.medium} ${className}`}
      {...props}
    >
      {Icon && <Icon className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />}
      {children}
    </span>
  );
};

export default Badge;
