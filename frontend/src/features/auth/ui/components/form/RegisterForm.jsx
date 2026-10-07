import { Link } from 'react-router';
import Card from '../../../../../components/ui/Card';
import Button from '../../../../../components/ui/Button';
import AuthFormHeader from './AuthFormHeader';
import FormField from './FormField';
import { useRegistration } from '../../../hooks/useRegistration';

const RegisterForm = () => {

  const {
    onSubmit,
    register, handleSubmit,  errors, isSubmitting,
    profilePicPreview,
     
  } = useRegistration()


  return (
    <Card 
      variant="default" 
      padding="large" 
      className="w-full max-w-md mx-auto backdrop-blur-sm"
    >
      <div className="mb-6 flex flex-col items-center">
        <label
          htmlFor="profilePic"
          className="relative flex h-28 w-28 cursor-pointer items-center justify-center overflow-hidden rounded-full border-2 border-dashed border-primary text-center text-sm text-text-secondary"
        >
          {profilePicPreview ? (
            <img
              src={profilePicPreview}
              alt="Selected profile"
              className="h-full w-full object-cover"
            />
          ) : (
            <span>Choose photo</span>
          )}
          <input
            id="profilePic"
            type="file"
            accept="image/*"
            className="sr-only"
            {...register('profilePic')}
          />
        </label>
        <span className="mt-2 text-sm text-text-secondary">
          Profile Photo
        </span>
      </div>

      <AuthFormHeader 
        title="Create Account"
        subtitle="Join us and start your fitness journey"
      />
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
        <FormField
          label="Full Name"
          type="text"
          id="name"
          name="name"
          {...register('name', { required: 'Name is required' })}
          placeholder="Enter your full name"
          error={errors.name?.message}
          required
        />

        <FormField
          label="Phone Number"
          type="tel"
          id="phoneNumber"
          name="phoneNumber"
          {...register('phoneNumber', {
            required: 'Phone number is required',
            validate: value =>
              /^[0-9]{10}$/.test(value.replace(/\s+/g, '')) ||
              'Please enter a valid 10-digit phone number'
          })}
          placeholder="Enter your phone number"
          error={errors.phoneNumber?.message}
          required
        />
        
        <FormField
          label="Age"
          type="number"
          id="age"
          name="age"
          {...register('age', {
            required: 'Age is required',
            valueAsNumber: true,
            validate: value =>
              (value >= 10 && value <= 100) || 'Age must be between 10 and 100'
          })}
          placeholder="Enter your age"
          error={errors.age?.message}
          required
        />
        
        <FormField
          label="Password"
          type="password"
          id="password"
          name="password"
          {...register('password', {
            required: 'Password is required',
            minLength: { value: 6, message: 'Password must be at least 6 characters' }
          })}
          placeholder="Enter your password"
          error={errors.password?.message}
          required
        />
        
        <Button
          type="submit"
          variant="primary"
          size="large"
          fullWidth
          loading={isSubmitting}
          disabled={isSubmitting}
          className="mt-6 hover:shadow-lg transform transition-all duration-200"
        >
          {isSubmitting ? 'Creating Account...' : 'Create Account'}
        </Button>
        
        <div className="text-center pt-2">
          <p className="text-text-secondary text-sm">
            Already have an account?{' '}
            <Link 
              to="/auth/login" 
              className="text-primary font-medium hover:text-primary-dark transition-colors duration-200"
            >
              Sign in
            </Link>
          </p>
        </div>
      </form>
    </Card>
  );
};

export default RegisterForm;
