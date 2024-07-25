import axiosInstance from "../helpers/axios"

export default {
    getStoryAuthors: (queries) => {
        return axiosInstance().get('/story-api/storyAuthorDetail', {
            params: queries
        })
    },
    createStoryAuthor: (data) => {
        return axiosInstance().post('/story-api/storyAuthorDetail', data)
    },
    deleteStoryAuthor: (data) => {
        return axiosInstance().delete('/story-api/storyAuthorDetail', {
            data
        })
    }
}