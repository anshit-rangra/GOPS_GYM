import LoginForm from '../components/form/LoginForm';

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-bg-secondary">
      <div className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12">
        {/* Left side - Branding/Info */}
        <div className="hidden lg:flex flex-col items-start justify-center space-y-6 max-w-lg">
          <div className="space-y-4">
            <h2 className="text-4xl xl:text-5xl font-bold text-text-primary leading-tight">
              Welcome Back to
              <span className="text-primary block">GOPS GYM</span>
            </h2>
            <p className="text-lg text-text-secondary leading-relaxed">
              Continue your fitness journey with personalized workout plans, 
              track your progress, and stay motivated every day.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-8">
            <div className="bg-bg-primary p-4 rounded-lg shadow-sm border border-border hover:shadow-md transition-shadow duration-200">
              <div className="text-2xl font-bold text-primary">24/7</div>
              <div className="text-sm text-text-secondary">Access</div>
            </div>
            <div className="bg-bg-primary p-4 rounded-lg shadow-sm border border-border hover:shadow-md transition-shadow duration-200">
              <div className="text-2xl font-bold text-primary">Pro</div>
              <div className="text-sm text-text-secondary">Equipment</div>
            </div>
          </div>
        </div>

        {/* Right side - Login Form */}
        <div className="w-full flex items-center justify-center lg:justify-end">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default Login;
