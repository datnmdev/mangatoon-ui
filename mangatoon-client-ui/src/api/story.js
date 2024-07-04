import axiosInstance from "../helpers/axios"

export default {
    getStories: (queries) => {
        return axiosInstance().get('/story-api/story', {
            params: queries
        })
    }
}