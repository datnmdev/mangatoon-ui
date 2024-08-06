import axiosInstance from "../helpers/axios"

export default {
    getViewCountOfStory: (storyId) => {
        return axiosInstance().get(`/story-api/viewDetail/story/${storyId}/viewCount`)
    },
    createViewDetail: (data) => {
        return axiosInstance().post('/story-api/viewDetail', data)
    },
    getTopViewList: (queries) => {
        return axiosInstance().get('/story-api/viewDetail/story/topViewCount', {
            params: queries
        })
    },
    getViewCountOfChapter: (chapterId, queries) => {
        return axiosInstance().get(`/story-api/viewDetail/chapter/${chapterId}/viewCount`, {
            params: queries
        })
    }
}