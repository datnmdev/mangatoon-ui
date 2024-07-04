import axiosInstance from "../helpers/axiosInstance"

export default {
    getGenres: (queries) => {
        if (queries) {
            return axiosInstance.get(`/story-api/genre?${Object.keys(queries).map(key => (`${key}=${queries[key]}`)).join('&')}`)
        }
        return axiosInstance.get('/story-api/genre')
    },
    deleteGenre: (id) => {
        return axiosInstance.delete(`/story-api/genre/${id}`)
    },
    createGenre: (data) => {
        return axiosInstance.post('/story-api/genre', data)
    },
    updateGenre: (data) => {
        return axiosInstance.post(`/story-api/genre/${data.id}`, {
            name: data.name,
            description: data.description
        })
    }
}