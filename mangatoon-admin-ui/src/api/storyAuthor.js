import axiosInstance from "../helpers/axiosInstance"

export default {
    getStoryAuthors: (queries) => {
        return axiosInstance.get(`/story-api/storyAuthorDetail?${Object.keys(queries).map(key => (`${key}=${queries[key]}`)).join('&')}`)
    },
    createStoryAuthor: (data) => {
        return axiosInstance.post('/story-api/storyAuthorDetail', data)
    },
    deleteStoryAuthor: (data) => {
        return axiosInstance.delete('/story-api/storyAuthorDetail', { data })
    }
}