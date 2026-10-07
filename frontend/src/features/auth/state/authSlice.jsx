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

        registrationSuccess: (state, action) => {
            state.loading = false
            state.error = null
        },

        registrationFailure: (state, action) => {
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
    registrationSuccess,
    registrationFailure,
    logout,
    clearAuthError
    
} = authSlice.actions


export default authSlice.reducer;