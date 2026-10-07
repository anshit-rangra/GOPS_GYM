const AuthFormHeader = ({ title, subtitle, className = '' }) => {
  return (
    <div className={`text-center space-y-2 mb-8 ${className}`}>
      <h1 className="text-3xl md:text-4xl font-bold text-text-primary tracking-tight">
        {title}
      </h1>
      {subtitle && (
        <p className="text-text-secondary text-base md:text-lg">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default AuthFormHeader;
