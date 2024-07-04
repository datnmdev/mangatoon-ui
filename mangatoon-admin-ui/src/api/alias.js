import axiosInstance from "../helpers/axiosInstance"

export default {
    getAliases: (queries) => {
        return axiosInstance.get(`/story-api/alias?${Object.keys(queries).map(key => (`${key}=${queries[key]}`)).join('&')}`)
    },
    createAlias: (data) => {
        return axiosInstance.post('/story-api/alias', data)
    },
    deleteAlias: (id) => {
        return axiosInstance.delete(`/story-api/alias/${id}`)
    }
}