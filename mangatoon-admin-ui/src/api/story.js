import axiosInstance from "../helpers/axiosInstance"

export default {
    getStories: (queries) => {
        return axiosInstance.get(`/story-api/story?${Object.keys(queries).map(key => (`${key}=${queries[key]}`)).join('&')}`)
    },
    updateStory: (data) => {
        return axiosInstance.post(`/story-api/story/${data.id}`, data)
    },
    createStory: (data) => {
        return axiosInstance.post('story-api/story', data)
    }
}