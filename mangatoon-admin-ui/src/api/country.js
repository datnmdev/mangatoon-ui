import axiosInstance from "../helpers/axiosInstance"

export default {
    getCountries: (queries) => {
        if (queries) {
            return axiosInstance.get(`/story-api/country?${Object.keys(queries).map(key => (`${key}=${queries[key]}`)).join('&')}`)
        }
        return axiosInstance.get('/story-api/country')
    }
}