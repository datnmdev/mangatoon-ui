import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../helpers/axiosInstance";

const initialState = {
    refetch: {
        value: 0
    },
    data: null
}

export const refreshAsyncThunks = {
    submit: createAsyncThunk('refreshToken/submit', async () => {
        const response = await axiosInstance.post('/user-api/auth/refreshToken', {
            headers:{
                Authorization: `Bearer ${localStorage.getItem('refreshToken')}`
            }
        })
        return response.data
    })
}

const refreshTokenSlice= createSlice({
    name: 'refreshToken',
    initialState,
    reducers: {
        refetch: (state) => {
            return {
                ...state,
                refetch: {
                    value: 1
                }
            }
        }
    },
    extraReducers: builder => {
        builder.addCase(refreshAsyncThunks.submit.fulfilled, (state, action) => {
            return {
                ...state,
                data: action.payload
            }
        })
    }
})

export const refreshTokenActions = refreshTokenSlice.actions

export const refreshTokenSelectors = {
    selectAll: state => state.refreshToken,
    selectData: state => state.refreshToken.data
}

export default refreshTokenSlice.reducer