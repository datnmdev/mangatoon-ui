import axiosInstance from "../helpers/axios"

export default {
    getAlias: (queries) => {
        return axiosInstance().get('/story-api/alias', {
            params: queries
        })
    }
}