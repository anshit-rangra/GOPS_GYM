import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    user: null,
    accessToken: null,
    isAuthanticated: false,
    loading: false,
    error: null,
}


const authSlice = createSlice({
    name: "auth",
    initialState,

    reducers: {

        registrationStart: (state) => {
            state.loading = true
            state.error = null 
        },

        loginStart: (state) => {
            state.loading = true;
            state.error = null
        },

        registrationSuccess: (state) => {
            state.loading = false
            state.error = null
        },

        loginSuccess: (state, action) => {
            state.loading = false;
            state.error = null
            state.isAuthanticated = true 
            state.user = action.payload.user
            state.accessToken = action.payload.accessToken
        },

        registrationFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload
        },

        loginFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload
        },


        logout: (state) => {
            state.user = null,
            state.accessToken = null,
            state.isAuthanticated = false,
            state.loading = false,
            state.error = null
        },

        clearAuthError: (state) => {
            state.error = null;
        }

    }
})


export const {
    registrationStart,
    loginStart,
    registrationSuccess,
    loginSuccess,
    registrationFailure,
    loginFailure,
    logout,
    clearAuthError
    
} = authSlice.actions


export default authSlice.reducer;