import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../api'
import { store } from '../main'

const initialState = {
    tokens: null,
    profile: null,
    accountInfo: null
}

export const userAsyncThunks = {
    getProfile: createAsyncThunk('user/getProfile', async () => {
        const res = await api.user.getProfile(store.getState().user.tokens?.accessToken)
        return res.data
    }),
    getAccountInfo: createAsyncThunk('user/getAccountInfo', async () => {
        const res = await api.user.getAccountInfo()
        return res.data
    })
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addTokens: (state, action) => {
            localStorage.setItem('tokens', JSON.stringify(action.payload))
            state.tokens = action.payload
        },
        removeTokens: (state) => {
            localStorage.removeItem('tokens')
            state.tokens = null
        },
        addProfile: (state, action) => {
            state.profile = action.payload
        },
        removeProfile: (state) => {
            state.profile = null
        },
        removeAccountInfo: (state) => {
            state.accountInfo = null
        }
    },
    extraReducers: builder => {
        builder
            .addCase(userAsyncThunks.getProfile.fulfilled, (state, action) => {
                state.profile = action.payload.data
            })
            .addCase(userAsyncThunks.getAccountInfo.fulfilled, (state, action) => {
                state.accountInfo = action.payload.data
            })
    }
})

export const userActions = userSlice.actions

export const userSelectors = {
    selectAll: state => state.user,
    selectTokens: state => state.user.tokens,
    selectProfile: state => state.user.profile,
    selectAccountInfo: state => state.user.accountInfo
}

const userReducer = userSlice.reducer
export default userReducer