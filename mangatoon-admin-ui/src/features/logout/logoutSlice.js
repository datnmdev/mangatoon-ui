import { createSlice } from "@reduxjs/toolkit";

const initialState = null

const logoutSlice = createSlice({
    name: 'logout',
    initialState,
    reducers: {
        submit: () => {
            localStorage.removeItem('accessToken')
            localStorage.removeItem('refreshToken')
        }
    }
})

export const logoutActions = logoutSlice.actions

export default logoutSlice.reducer