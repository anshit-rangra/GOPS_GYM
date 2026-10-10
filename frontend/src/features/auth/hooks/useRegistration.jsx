import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { registerThunk } from "../state/authThunk";

const PHONE_REGEX = /^[6-9]\d{9}$/;

export const useRegistration = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector((state) => state.auth.loading);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      phoneNumber: "",
      age: "",
      password: "",
      profilePic: null,
    },
  });

  const profilePic = watch("profilePic");
  const [profilePicPreview, setProfilePicPreview] = useState(null);

  useEffect(() => {
    const selectedPhoto = profilePic?.[0];

    if (!selectedPhoto) {
      setProfilePicPreview(null);
      return undefined;
    }

    const previewUrl = URL.createObjectURL(selectedPhoto);
    setProfilePicPreview(previewUrl);

    return () => URL.revokeObjectURL(previewUrl);
  }, [profilePic]);

  const onSubmit = async (submitData) => {
    const formData = new FormData();
    formData.append("name", submitData.name);
    formData.append("age", submitData.age);
    formData.append("phoneNumber", submitData.phoneNumber);
    formData.append("password", submitData.password);

    const photo = submitData.profilePic?.[0];
    if (photo) formData.append("profilePic", photo);

    try {
      await dispatch(registerThunk(formData));
      navigate("/auth/login", { replace: true });
    } catch {
      /* error toast handled in the thunk */
    }
  };

  const phoneValidation = {
    required: "Phone number is required",
    pattern: {
      value: PHONE_REGEX,
      message: "Enter a valid 10-digit Indian mobile number",
    },
  };

  const photoValidation = {
    validate: (value) =>
      Boolean(value?.[0]) || "A profile photo is required to register",
  };

  return {
    onSubmit,
    loading,
    register,
    handleSubmit,
    watch,
    errors,
    phoneValidation,
    photoValidation,
    profilePicPreview,
  };
};
