import axiosInstance from "../helpers/axios"

export default {
    getFollowCountOfStory: (storyId) => {
        return axiosInstance().get(`/story-api/storyFollowDetail/story/${storyId}/followCount`)
    },
    createStoryFollowDetail: (data) => {
        return axiosInstance().post('/story-api/storyFollowDetail', data)
    },
    deleteStoryFollowDetail: (data) => {
        return axiosInstance().delete('/story-api/storyFollowDetail', {
            data
        })
    },
    getStoryFollowDetail: (queries) => {
        return axiosInstance().get('/story-api/storyFollowDetail', {
            params: queries
        })
    },
    getTopFollowList: (queries) => {
        return axiosInstance().get('/story-api/storyFollowDetail/story/topFollowCount', {
            params: queries
        })
    }
}