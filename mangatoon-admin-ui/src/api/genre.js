import axiosInstance from "../helpers/axios"

export default {
    getGenres: (queries) => {
        return axiosInstance().get('/story-api/genre', {
            params: queries
        })
    },
    searchGenre: (queries) => {
        return axiosInstance().get('/story-api/genre/search', {
            params: queries
        })
    }
}