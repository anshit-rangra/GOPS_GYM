import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { registerThunk } from '../state/authThunk'


export const useRegistration = () => {
  
    const dispatch = useDispatch()
    const loadingState = useSelector((state) => state.auth.loading)


  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: {
      name: '',
      phoneNumber: '',
      age: '',
      password: '',
      profilePic: null
    }
  });

  const profilePic = watch('profilePic');
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
    try {

      const formData = new FormData()

      Object.entries(submitData).forEach(([key, value]) => {
        
        if(key === "profilePic") {
          formData.append(key, value[0])
        }else {
        formData.append(key, value)
        }
      })

      
      dispatch(registerThunk(formData))

    } catch (error) {
      console.error('Registration error:', error);
    }
  };
    
  return {
    onSubmit,
    loadingState,
    control, register, handleSubmit, watch, errors, isSubmitting,
    profilePicPreview,

  }

}

