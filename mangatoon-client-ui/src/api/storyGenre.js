import axiosInstance from "../helpers/axios"

export default {
    getStoryGenres: (queries) => {
        return axiosInstance().get(`/story-api/storyGenreDetail`, {
            params: queries
        })
    }
}