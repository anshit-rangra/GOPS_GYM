import LoginForm from '../components/form/LoginForm';

const Login = () => {
  return (
    <div className="app-shell theme-dark min-h-screen flex items-center justify-center p-4 bg-night text-ink">
      <div className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12">
        <div className="hidden lg:flex flex-col items-start justify-center space-y-6 max-w-lg">
          <div className="space-y-4">
            <h2 className="text-4xl xl:text-5xl font-bold text-ink leading-tight">
              Welcome Back to
              <span className="text-volt block">GOPS GYM</span>
            </h2>
            <p className="text-lg text-muted leading-relaxed">
              Continue your fitness journey, track every check-in, and stay
              motivated every day.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-8">
            <div className="bg-panel p-4 rounded-lg border border-line">
              <div className="text-2xl font-bold text-volt">24/7</div>
              <div className="text-sm text-muted">Access</div>
            </div>
            <div className="bg-panel p-4 rounded-lg border border-line">
              <div className="text-2xl font-bold text-volt">QR</div>
              <div className="text-sm text-muted">Check-in</div>
            </div>
          </div>
        </div>

        <div className="w-full flex items-center justify-center lg:justify-end">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default Login;
