import axiosInstance from "../helpers/axios"

export default {
    signIn: (data) => {
        return axiosInstance().post('/user-api/auth/signIn/emailPassword/admin', data)
    },
    refreshToken: (data) => {
        return axiosInstance().post('/user-api/auth/refreshToken', data)
    },
    signOut: (data) => {
        return axiosInstance().post('/user-api/auth/signOut', data)
    }
}