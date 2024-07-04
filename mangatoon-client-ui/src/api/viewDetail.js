import axiosInstance from "../helpers/axios"

export default {
    getViewCountOfStory: (storyId) => {
        return axiosInstance().get(`/story-api/viewDetail/story/${storyId}/viewCount`)
    },
    createViewDetail: (data) => {
        return axiosInstance().post('/story-api/viewDetail', data)
    }
}