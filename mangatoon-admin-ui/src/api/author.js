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
    }
}