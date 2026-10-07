import { useState } from 'react';
import { Link } from 'react-router';
import Card from '../../../../../components/ui/Card';
import Button from '../../../../../components/ui/Button';
import AuthFormHeader from './AuthFormHeader';
import FormField from './FormField';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    phoneNumber: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    try {
      console.log('Login data:', formData);
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

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
      
      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        <FormField
          label="Phone Number"
          type="tel"
          id="phoneNumber"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          placeholder="Enter your phone number"
          error={errors.phoneNumber}
          required
        />
        
        <FormField
          label="Password"
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
          error={errors.password}
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
          loading={isLoading}
          disabled={isLoading}
          className="mt-8 hover:shadow-lg transform transition-all duration-200"
        >
          {isLoading ? 'Signing in...' : 'Sign In'}
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
