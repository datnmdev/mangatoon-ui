import axiosInstance from "../helpers/axios"

export default {
    getCountries: () => {
        return axiosInstance().get('/story-api/country')
    }
}