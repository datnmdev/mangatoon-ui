import axiosInstance from "../helpers/axios"

export default {
    getChapterImages: (queries) => {
        return axiosInstance().get('/story-api/chapterImage', {
            params: queries
        })
    },
    getImage: (data) => {
        return axiosInstance().post('/story-api/chapterImage/image/blob', data, {
            responseType: 'blob'
        })
    }
}