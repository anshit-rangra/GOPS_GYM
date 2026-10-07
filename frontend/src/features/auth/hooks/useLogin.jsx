import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { loginThunk } from "../state/authThunk";


export const useLogin = () => {

    const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: {
      phoneNumber: '',
      password: ''
    }
  });

  const onSubmit = async (formData) => {
    try {
      
      dispatch(loginThunk(formData))


    } catch (error) {
      console.error('Login error:', error);
    }
  };


  return {
    onSubmit,
    register,
    handleSubmit,
    errors,
    isSubmitting
  }
  
}
