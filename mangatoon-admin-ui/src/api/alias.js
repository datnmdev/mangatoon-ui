import axiosInstance from "../helpers/axios"

export default {
    getAliases: (queries) => {
        return axiosInstance().get('/story-api/alias', {
            params: queries
        })
    },
    createAlias: (data) => {
        return axiosInstance().post('/story-api/alias', data)
    },
    deleteAliasById: (id) => {
        return axiosInstance().delete(`/story-api/alias/${id}`)
    }
}