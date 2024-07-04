import axiosInstance from "../helpers/axios"

export default {
    getChapters: (queries) => {
        return axiosInstance().get('/story-api/chapter', {
            params: queries
        })
    }
}