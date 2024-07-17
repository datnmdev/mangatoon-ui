import { createSlice } from "@reduxjs/toolkit"

const initialState = []

const toastSlice = createSlice({
    name: 'toast',
    initialState,
    reducers: {
        addToast: (state, action) => {
            state.push({
                ...action.payload,
                id: state.length === 0 ? 0 : state[state.length-1].id + 1
            })
        },
        removeToast: (state, action) => {
            const index = state.findIndex(toast => toast.id === action.payload)
            state.splice(index, 1)
        }
    }
})

export const toastActions = toastSlice.actions

export const toastSelectors = {
    selectAll: state => state.toast
}

const toastReducer = toastSlice.reducer
export default toastReducer