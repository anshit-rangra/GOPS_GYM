import { showError, showSuccess } from "../../../lib/toast/toast"
import { loginUser, registerUser } from "../api/authApi"
import {  registrationStart, registrationFailure, registrationSuccess, loginFailure, loginStart, loginSuccess } from "./authSlice"



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

export const loginThunk = (credentials) => async (dispatch) => {
    try {

        dispatch(loginStart())

        const response = await loginUser(credentials)

        dispatch(loginSuccess({ user: response.data.user, accessToken: response.data.accessToken}))

        showSuccess(response.message)

        
    } catch (error) {
        showError(error?.response?.data?.errors[0]?.msg)
        dispatch(
            loginFailure(
                error.response?.data?.message || "Registration Failed"
            )
        )
    }
}