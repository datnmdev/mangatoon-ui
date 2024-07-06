import axiosInstance from "../helpers/axios"

export default {
    getRatingInfoOfStory: (storyId) => {
        return axiosInstance().get(`/story-api/storyRatingDetail/story/${storyId}/rating`)
    },
    getStoryRatingDetail: (queries) => {
        return axiosInstance().get('/story-api/storyRatingDetail', {
            params: queries
        })
    },
    createStoryRatingDetail: (data) => {
        return axiosInstance().post('/story-api/storyRatingDetail', data)
    },
    updateStoryRatingDetail: (data) => {
        return axiosInstance().put('/story-api/storyRatingDetail', data)
    },
     getTopRatingList: (queries) => {
        return axiosInstance().get('/story-api/storyRatingDetail/story/topRating', {
            params: queries
        })
     }
}