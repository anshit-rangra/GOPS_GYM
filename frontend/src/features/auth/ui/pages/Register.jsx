import RegisterForm from '../components/form/RegisterForm';

const Register = () => {
  return (
    <div className="app-shell theme-dark min-h-screen flex items-center justify-center p-4 bg-night text-ink">
      <div className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12">
        <div className="hidden lg:flex flex-col items-start justify-center space-y-6 max-w-lg">
          <div className="space-y-4">
            <h2 className="text-4xl xl:text-5xl font-bold text-ink leading-tight">
              Start Your Fitness
              <span className="text-volt block">Journey Today</span>
            </h2>
            <p className="text-lg text-muted leading-relaxed">
              Join the gym community, check in with a QR scan, and track your
              consistency from day one.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-8">
            <div className="bg-panel p-4 rounded-lg border border-line">
              <div className="text-2xl font-bold text-volt">QR</div>
              <div className="text-sm text-muted">Instant check-in</div>
            </div>
            <div className="bg-panel p-4 rounded-lg border border-line">
              <div className="text-2xl font-bold text-volt">60d</div>
              <div className="text-sm text-muted">Heatmap</div>
            </div>
            <div className="bg-panel p-4 rounded-lg border border-line">
              <div className="text-2xl font-bold text-volt">24/7</div>
              <div className="text-sm text-muted">Gym access</div>
            </div>
            <div className="bg-panel p-4 rounded-lg border border-line">
              <div className="text-2xl font-bold text-volt">100%</div>
              <div className="text-sm text-muted">Real data</div>
            </div>
          </div>
        </div>

        <div className="w-full flex items-center justify-center lg:justify-end">
          <RegisterForm />
        </div>
      </div>
    </div>
  );
};

export default Register;
