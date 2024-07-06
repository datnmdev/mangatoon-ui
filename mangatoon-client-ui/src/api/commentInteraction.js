import axiosInstance from "../helpers/axios"

export default {
    getCommentInteractionCount: (commentId) => {
        return axiosInstance().get(`/comment-api/commentInteraction/comment/${commentId}/commentInteractionCount`)
    },
    getCommentInteraction: (queries) => {
        return axiosInstance().get('/comment-api/commentInteraction', {
            params: queries
        })
    },
    createCommentInteraction: (data) => {
        return axiosInstance().post('/comment-api/commentInteraction', data)
    },
    updateCommentInteraction: (data) => {
        return axiosInstance().put('/comment-api/commentInteraction', data)
    },
    deleteCommentInteraction: (data) => {
        return axiosInstance().delete('/comment-api/commentInteraction', {
            data
        })
    }
}