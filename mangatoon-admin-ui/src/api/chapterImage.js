import axiosInstance from "../helpers/axios"

export default {
    getChapterImages: (queries) => {
        return axiosInstance().get('/story-api/chapterImage', {
            params: queries
        })
    },
    createChapterImages: (data) => {
        return axiosInstance().post('/story-api/chapterImage', data)
    },
    deleteChapterImageByChapterId: (chapterId) => {
        return axiosInstance().delete('/story-api/chapterImage', {
            data: {
                chapterId
            }
        })
    },
    deleteChapterImageById: (id) => {
        return axiosInstance().delete(`/story-api/chapterImage/${id}`)
    },
    updateChapterImage: (id, data) => {
        return axiosInstance().post(`/story-api/chapterImage/${id}`, data)
    }
}