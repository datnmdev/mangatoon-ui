import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../features/user.feature'
import toastReducer from '../features/toast.feature'

export default configureStore({
    reducer: {
        user: userReducer,
        toast: toastReducer
    }
})