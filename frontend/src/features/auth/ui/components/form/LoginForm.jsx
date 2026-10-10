import { Link } from 'react-router';
import Card from '../../../../../components/ui/Card';
import Button from '../../../../../components/ui/Button';
import AuthFormHeader from './AuthFormHeader';
import FormField from './FormField';
import { useLogin } from '../../../hooks/useLogin';

const LoginForm = () => {

  const { onSubmit, register, loading, errors, handleSubmit } = useLogin()

  return (
    <Card 
      variant="panel" 
      padding="large" 
      className="w-full max-w-md mx-auto"
    >
      <AuthFormHeader 
        title="Welcome Back"
        subtitle="Sign in to continue your fitness journey"
      />
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
        <FormField
          label="Phone Number"
          type="tel"
          id="phoneNumber"
          name="phoneNumber"
          {...register('phoneNumber', {
            required: 'Phone number is required',
            pattern: {
              value: /^[6-9]\d{9}$/,
              message: 'Enter a valid 10-digit Indian mobile number',
            },
          })}
          placeholder="Enter your phone number"
          error={errors.phoneNumber?.message}
          required
        />
        
        <FormField
          label="Password"
          type="password"
          id="password"
          name="password"
          {...register('password', { required: 'Password is required' })}
          placeholder="Enter your password"
          error={errors.password?.message}
          required
        />
        
        <Button
          type="submit"
          variant="accent"
          size="large"
          fullWidth
          loading={loading}
          disabled={loading}
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </Button>
        
        <div className="text-center">
          <p className="text-muted text-sm">
            Don&apos;t have an account?{' '}
            <Link 
              to="/auth/register" 
              className="text-volt font-medium hover:text-volt-strong transition-colors duration-200"
            >
              Create account
            </Link>
          </p>
        </div>
      </form>
    </Card>
  );
};

export default LoginForm;
