import axiosInstance from "../helpers/axios"

export default {
    getComments: (queries) => {
        return axiosInstance().get('/comment-api/comment', {
            params: queries
        })
    },
    createComment: (data) => {
        return axiosInstance().post('/comment-api/comment', data)
    },
    updateComment: (data) => {
        return axiosInstance().put('/comment-api/comment', data)
    }
}