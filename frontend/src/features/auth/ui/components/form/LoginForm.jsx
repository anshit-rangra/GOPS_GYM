import { Link } from 'react-router';
import Card from '../../../../../components/ui/Card';
import Button from '../../../../../components/ui/Button';
import AuthFormHeader from './AuthFormHeader';
import FormField from './FormField';
import { useLogin } from '../../../hooks/useLogin';

const LoginForm = () => {

  const { onSubmit, register, isSubmitting, errors, handleSubmit } = useLogin()


  return (
    <Card 
      variant="default" 
      padding="large" 
      className="w-full max-w-md mx-auto backdrop-blur-sm"
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
          {...register('phoneNumber', { required: 'Phone number is required' })}
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
        
        <div className="flex items-center justify-end">
          <Link 
            to="/auth/forgot-password" 
            className="text-sm text-primary font-medium hover:text-primary-dark transition-colors duration-200"
          >
            Forgot password?
          </Link>
        </div>
        
        <Button
          type="submit"
          variant="primary"
          size="large"
          fullWidth
          loading={isSubmitting}
          disabled={isSubmitting}
          className="mt-8 hover:shadow-lg transform transition-all duration-200"
        >
          {isSubmitting ? 'Signing in...' : 'Sign In'}
        </Button>
        
        <div className="text-center pt-4">
          <p className="text-text-secondary text-sm">
            Don&apos;t have an account?{' '}
            <Link 
              to="/auth/register" 
              className="text-primary font-medium hover:text-primary-dark transition-colors duration-200"
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
