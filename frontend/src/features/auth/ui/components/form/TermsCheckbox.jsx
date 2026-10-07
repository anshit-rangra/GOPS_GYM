import Checkbox from '../../../../../components/ui/Checkbox';
import { Link } from 'react-router';

const TermsCheckbox = ({ checked, onChange, error }) => {
  return (
    <Checkbox
      label={
        <span>
          I agree to the{' '}
          <Link 
            to="/terms" 
            className="text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] underline transition-colors"
          >
            Terms & Conditions
          </Link>{' '}
          and{' '}
          <Link 
            to="/privacy" 
            className="text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] underline transition-colors"
          >
            Privacy Policy
          </Link>
        </span>
      }
      id="terms"
      name="terms"
      checked={checked}
      onChange={onChange}
      error={error}
      required
    />
  );
};

export default TermsCheckbox;
