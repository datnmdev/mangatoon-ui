import axiosInstance from "../helpers/axios"

export default {
    getAuthors: (queries) => {
        return axiosInstance().get('/story-api/author', {
            params: queries
        })
    }
}