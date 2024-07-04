import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../helpers/axiosInstance";
import api from "../../api";

const initialState = null

export const loginAsyncThunks = {
    submit: createAsyncThunk('login/submit', async (data) => {
        const response = await api.login(data)
        return response.data.data.token
    })
}

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {

    },
    extraReducers: build => {
        build.addCase(loginAsyncThunks.submit.fulfilled, (state, action) => {
            return action.payload
        })
    }
})

export const loginSelectors = {
    selectAll: state => state.login
}

export default loginSlice.reducer