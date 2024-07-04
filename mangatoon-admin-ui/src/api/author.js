import axiosInstance from "../helpers/axiosInstance"

export default {
    getAuthors: (queries) => {
        if (queries) {
            return axiosInstance.get(`/story-api/author?${Object.keys(queries).map(key => (`${key}=${queries[key]}`)).join('&')}`)
        }
        return axiosInstance.get('/story-api/author')
    },
    deleteAuthor: (id) => {
        return axiosInstance.delete(`/story-api/author/${id}`)
    },
    createAuthor: (data) => {
        return axiosInstance.post('/story-api/author', data)
    },
    updateAuthor: (data) => {
        return axiosInstance.post(`/story-api/author/${data.id}`, {
            name: data.name,
        })
    },
    searchAuthor: (keyword) => {
        return axiosInstance.get(`/story-api/author/search?keyword=${keyword}`)
    }
}