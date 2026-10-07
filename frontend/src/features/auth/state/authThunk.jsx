import { showError, showSuccess } from "../../../lib/toast/toast"
import { registerUser } from "../api/authApi"
import {  registrationStart, registrationFailure, registrationSuccess } from "./authSlice"



export const registerThunk  = (credentials) => async (dispatch) => {
    try {
        
        dispatch(registrationStart())

        const data = await registerUser(credentials)

        dispatch(registrationSuccess())

        showSuccess(data.message)

        
    } catch (error) {
        showError(error.response?.data?.message)
        dispatch(
            registrationFailure(
                error.response?.data?.message || "Registration Failed"
            )
        )
    }
}