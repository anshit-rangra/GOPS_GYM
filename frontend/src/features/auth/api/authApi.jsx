import api from '../../../lib/api/axios'


export const registerUser = async (credentials) => {

    const response = await api.post("/auth/register", credentials, {
        headers:{
            'Content-Type':'multipart/formData'
        }
    });


    return response.data;

}

