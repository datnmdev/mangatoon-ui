import axiosInstance from "../helpers/axios"

export default {
    getHistories: (queries) => {
        return axiosInstance().get('/story-api/historyDetail', {
            params: queries
        })
    },
    createHistoryDetail: (data) => {
        return axiosInstance().post('/story-api/historyDetail', data)
    },
    deleteHistoryDetail: (id) => {
        return axiosInstance().delete(`/story-api/historyDetail/${id}`)
    },
    deleteAllHistory: () => {
        return axiosInstance().delete('/story-api/historyDetail')
    }
}