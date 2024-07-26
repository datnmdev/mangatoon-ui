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
    },
    deleteGenre: (id) => {
        return axiosInstance().delete(`/story-api/genre/${id}`)
    },
    updateGenre: (id, data) => {
        return axiosInstance().post(`/story-api/genre/${id}`, data)
    },
    createGenre: (data) => {
        return axiosInstance().post('/story-api/genre', data)
    }
}