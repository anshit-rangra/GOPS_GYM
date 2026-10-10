import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { loginThunk } from "../state/authThunk";
import { getRoleHome } from "../../../lib/auth/roles";

export const useLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const loading = useSelector((state) => state.auth.loading);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      phoneNumber: "",
      password: "",
    },
  });

  const onSubmit = async (formData) => {
    try {
      const user = await dispatch(loginThunk(formData));
      const redirectTo = location.state?.from?.pathname;
      navigate(redirectTo || getRoleHome(user), { replace: true });
    } catch {
      /* error toast handled in the thunk */
    }
  };

  return { onSubmit, register, handleSubmit, errors, loading };
};
