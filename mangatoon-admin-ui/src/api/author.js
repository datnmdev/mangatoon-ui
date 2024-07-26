import axiosInstance from "../helpers/axios"

export default {
    getAuthors: (queries) => {
        return axiosInstance().get('/story-api/author', {
            params: queries
        })
    },
    searchAuthor: (queries) => {
        return axiosInstance().get('/story-api/author/search', {
            params: queries
        })
    },
    deleteAuthor: (id) => {
        return axiosInstance().delete(`/story-api/author/${id}`)
    },
    updateAuthor: (id, data) => {
        return axiosInstance().post(`/story-api/author/${id}`, data)
    },
    createAuthor: (data) => {
        return axiosInstance().post('/story-api/author', data)
    }
}