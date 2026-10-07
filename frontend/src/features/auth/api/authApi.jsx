import api from "../../../lib/api/axios";

export const registerUser = async (credentials) => {

    
  try {
    const response = await api.post("/auth/register", credentials, {
      headers: {
        "Content-Type": "multipart/formData",
      },
    });


    return response.data;
  } catch (error) {
    
    throw error;
  }
};


export const loginUser = async (credentials) => {
  try {

    const response = await api.post("/auth/login", credentials, {
      headers: {
        "Content-Type":"application/json"
      }
    })
    
    return response.data;
    
  } catch (error) {
    
    throw error;
  }
}
