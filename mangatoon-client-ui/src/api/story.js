import axiosInstance from "../helpers/axios"

export default {
    getStories: (queries) => {
        return axiosInstance().get('/story-api/story', {
            params: queries
        })
    },
    getImage: data => {
        return axiosInstance().post('/story-api/story/image/blob', data, {
            responseType: 'blob'
        })
    },
    search: (queries) => {
        return axiosInstance().get('/story-api/story/search', {
            params: queries
        })
    },
    getTopChartData: (queries) => {
        return axiosInstance().get('/story-api/story/chart', {
            params: queries
        })
    }
}