import axiosInstance from "../helpers/axiosInstance";

export default function login(data) {
    return axiosInstance.post('/user-api/auth/signIn/emailPassword', data)
}