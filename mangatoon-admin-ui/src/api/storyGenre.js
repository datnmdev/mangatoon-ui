import axiosInstance from "../helpers/axios"

export default {
    getStoryGenres: (queries) => {
        return axiosInstance().get('/story-api/storyGenreDetail', {
            params: queries
        })
    },
    createStoryGenre: (data) => {
        return axiosInstance().post('/story-api/storyGenreDetail', data)
    },
    deleteStoryGenre: (data) => {
        return axiosInstance().delete('/story-api/storyGenreDetail', {
            data
        })
    }
}