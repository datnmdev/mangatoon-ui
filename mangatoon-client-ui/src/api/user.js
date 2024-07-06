import axiosInstance from "../helpers/axios"

export default {
    signIn: (data) => {
        return axiosInstance().post('/user-api/auth/signIn/emailPassword', data)
    },
    sendOTP: (data) => {
        return axiosInstance().post('/user-api/otp/sendVerifyingAccountCode', data)
    },
    verifyAccount: (data) => {
        return axiosInstance().put('/user-api/account/verifyAccount', data)
    },
    signUp: (data) => {
        return axiosInstance().post('/user-api/auth/signUp/emailPassword', data)
    },
    checkEmail: (data) => {
        return axiosInstance().post('/user-api/emailPasswordCredential/checkEmail', data)
    },
    sendCodeToResetPassword: (data) => {
        return axiosInstance().post('/user-api/emailPasswordCredential/sendCodeToResetPassword', data)
    },
    verifyCodeToResetPassword: (data) => {
        return axiosInstance().post('/user-api/emailPasswordCredential/verifyCodeToResetPassword', data)
    },
    resetPassword: (data) => {
        return axiosInstance().post('/user-api/emailPasswordCredential/resetPassword', data)
    },
    signInWithGoogle: (data) => {
        return axiosInstance().post('/user-api/auth/signIn/google', data)
    },
    signInWithFacebook: (data) => {
        return axiosInstance().post('/user-api/auth/signIn/facebook', data)
    },
    refreshToken: (data) => {
        return axiosInstance().post('/user-api/auth/refreshToken', data)
    },
    getProfile: (accessToken) => {
        return axiosInstance().get('/user-api/user/getProfile', {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
    },
    signOut: (data) => {
        return axiosInstance().post('/user-api/auth/signOut', data)
    },
    getAccountInfo: () => {
        return axiosInstance().get('/user-api/account/getInfo')
    },
    updateProfile: (data) => {
        return axiosInstance().post('/user-api/user/updateProfile', data)
    },
    changePassword: (data) => {
        return axiosInstance().post('/user-api/emailPasswordCredential/changePassword', data)
    },
    getUserInfo: (userId) => {
        return axiosInstance().get(`/user-api/user/${userId}`)
    }
}