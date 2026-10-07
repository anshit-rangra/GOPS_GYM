import RegisterForm from '../components/form/RegisterForm';
import Loader from '../../../../components/common/Loader';
import { useRegistration } from '../../hooks/useRegistration';

const Register = () => {

  const { loadingState } = useRegistration()

  if(loadingState) return <Loader />

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[var(--color-bg-secondary)]">
      <div className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12">
        {/* Left side - Branding/Info */}
        <div className="hidden lg:flex flex-col items-start justify-center space-y-6 max-w-lg">
          <div className="space-y-4">
            <h2 className="text-4xl xl:text-5xl font-bold text-[var(--color-text-primary)] leading-tight">
              Start Your Fitness
              <span className="text-[var(--color-primary)] block">Journey Today</span>
            </h2>
            <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed">
              Join our gym community and track your progress with personalized workout plans, 
              expert guidance, and achieve your fitness goals faster.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-8">
            <div className="bg-[var(--color-bg-primary)] p-4 rounded-lg shadow-sm border border-[var(--color-border)] hover:shadow-md transition-shadow duration-200">
              <div className="text-2xl font-bold text-[var(--color-primary)]">500+</div>
              <div className="text-sm text-[var(--color-text-secondary)]">Active Members</div>
            </div>
            <div className="bg-[var(--color-bg-primary)] p-4 rounded-lg shadow-sm border border-[var(--color-border)] hover:shadow-md transition-shadow duration-200">
              <div className="text-2xl font-bold text-[var(--color-primary)]">50+</div>
              <div className="text-sm text-[var(--color-text-secondary)]">Expert Trainers</div>
            </div>
            <div className="bg-[var(--color-bg-primary)] p-4 rounded-lg shadow-sm border border-[var(--color-border)] hover:shadow-md transition-shadow duration-200">
              <div className="text-2xl font-bold text-[var(--color-primary)]">24/7</div>
              <div className="text-sm text-[var(--color-text-secondary)]">Gym Access</div>
            </div>
            <div className="bg-[var(--color-bg-primary)] p-4 rounded-lg shadow-sm border border-[var(--color-border)] hover:shadow-md transition-shadow duration-200">
              <div className="text-2xl font-bold text-[var(--color-primary)]">Pro</div>
              <div className="text-sm text-[var(--color-text-secondary)]">Equipment</div>
            </div>
          </div>
        </div>

        {/* Right side - Register Form */}
        <div className="w-full flex items-center justify-center lg:justify-end">
          <RegisterForm
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
