import axiosInstance from "../helpers/axios"

export default {
    signIn: (data) => {
        return axiosInstance().post('/user-api/auth/signIn/emailPassword/admin', data)
    },
    getProfile: (accessToken) => {
        return axiosInstance().get('/user-api/user/getProfile', {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
    },
    updateProfile: (data) => {
        return axiosInstance().post('/user-api/user/updateProfile', data)
    },
    changePassword: (data) => {
        return axiosInstance().post('/user-api/emailPasswordCredential/changePassword', data)
    },
    getAccountInfo: () => {
        return axiosInstance().get('/user-api/account/getInfo')
    },
    refreshToken: (data) => {
        return axiosInstance().post('/user-api/auth/refreshToken', data)
    },
    signOut: (data) => {
        return axiosInstance().post('/user-api/auth/signOut', data)
    },
    searchAccount: (queries) => {
        return axiosInstance().get('/user-api/account/search', {
            params: queries
        })
    },
    updateAccount: (id, data) => {
        return axiosInstance().post(`/user-api/account/${id}`, data)
    }
}