import axiosInstance from "../helpers/axios"

export default {
    search: (queries) => {
        return axiosInstance().get('/story-api/chapter/search', {
            params: queries
        })
    },
    updateChapter: (id, data) => {
        return axiosInstance().post(`/story-api/chapter/${id}`, data)
    },
    createChapter: (data) => {
        return axiosInstance().post('/story-api/chapter', data)
    }
}