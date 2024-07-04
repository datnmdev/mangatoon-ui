import axiosInstance from "../helpers/axios"

export default {
    getStoryAuthors: (queries) => {
        return axiosInstance().get('/story-api/storyAuthorDetail', {
            params: queries
        })
    }
}