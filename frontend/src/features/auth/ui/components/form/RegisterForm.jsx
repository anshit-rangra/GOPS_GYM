import { Link } from 'react-router';
import Card from '../../../../../components/ui/Card';
import Button from '../../../../../components/ui/Button';
import AuthFormHeader from './AuthFormHeader';
import FormField from './FormField';
import { useRegistration } from '../../../hooks/useRegistration';

const RegisterForm = () => {

  const {
    onSubmit,
    register, handleSubmit, errors, loading,
    phoneValidation, photoValidation,
    profilePicPreview,
  } = useRegistration()

  return (
    <Card 
      variant="panel" 
      padding="large" 
      className="w-full max-w-md mx-auto"
    >
      <div className="mb-6 flex flex-col items-center">
        <label
          htmlFor="profilePic"
          className="relative flex h-28 w-28 cursor-pointer items-center justify-center overflow-hidden rounded-full border-2 border-dashed border-volt/50 text-center text-sm text-muted transition-colors hover:border-volt"
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
            {...register('profilePic', photoValidation)}
          />
        </label>
        <span className="mt-2 text-sm text-muted">
          Profile Photo <span className="text-error">*</span>
        </span>
        {errors.profilePic && (
          <span className="mt-1 text-xs text-error">
            {errors.profilePic.message}
          </span>
        )}
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
          {...register('name', {
            required: 'Name is required',
            minLength: { value: 2, message: 'Name must be at least 2 characters' },
            maxLength: { value: 30, message: 'Name must be at most 30 characters' },
          })}
          placeholder="Enter your full name"
          error={errors.name?.message}
          required
        />

        <FormField
          label="Phone Number"
          type="tel"
          id="phoneNumber"
          name="phoneNumber"
          {...register('phoneNumber', phoneValidation)}
          placeholder="Enter your 10-digit phone number"
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
            min: { value: 1, message: 'Age must be at least 1' },
            max: { value: 100, message: 'Age must be at most 100' },
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
          placeholder="Create a password"
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
          className="mt-6"
        >
          {loading ? 'Creating Account...' : 'Create Account'}
        </Button>
        
        <div className="text-center pt-2">
          <p className="text-muted text-sm">
            Already have an account?{' '}
            <Link 
              to="/auth/login" 
              className="text-volt font-medium hover:text-volt-strong transition-colors duration-200"
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
