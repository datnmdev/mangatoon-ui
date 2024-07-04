import axios from "axios";

export default axios.create({
    baseURL: import.meta.env.VITE_API_GATEWAY_URL,
    headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken') || localStorage.getItem('refreshToken')}`
    }
})