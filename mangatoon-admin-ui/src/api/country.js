import axiosInstance from "../helpers/axios"

export default {
    getCountries: (queries) => {
        return axiosInstance().get('/story-api/country', {
            params: queries
        })
    }
}