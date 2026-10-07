import Input from '../../../../../components/ui/Input';
import PasswordInput from './PasswordInput';

const FormField = ({ type = 'text', ...props }) => {
  if (type === 'password') {
    return <PasswordInput type="password" {...props} />;
  }
  return <Input type={type} {...props} />;
};

export default FormField;
