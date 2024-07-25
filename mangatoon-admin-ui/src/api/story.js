import axiosInstance from "../helpers/axios"

export default {
    getStories: (queries) => {
        return axiosInstance().get('/story-api/story', {
            params: queries
        })
    },
    getImage: data => {
        return axiosInstance().post('/story-api/story/image/blob', data, {
            responseType: 'blob'
        })
    },
    search: (keyword) => {
        return axiosInstance().get('/story-api/story/search', {
            params: keyword
        })
    },
    updateStory: (id, data) => {
        return axiosInstance().post(`/story-api/story/${id}`, data)
    },
    createStory: (data) => {
        return axiosInstance().post('/story-api/story', data)
    }
}