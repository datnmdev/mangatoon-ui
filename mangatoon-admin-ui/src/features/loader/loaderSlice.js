import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    pageLoaderVisible: false,
}

const loaderSlice = createSlice({
    name: 'loader',
    initialState,
    reducers: {
        pageLoaderVisible: (state, action) => {
            state.pageLoaderVisible = action.payload
        }
    }
})

export const loaderActions = loaderSlice.actions

export const loaderSelectors = {
    selectPageLoaderVisible: state => state.loader.pageLoaderVisible
}

export default loaderSlice.reducer