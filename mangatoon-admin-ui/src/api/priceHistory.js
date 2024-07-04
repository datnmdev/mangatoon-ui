import axiosInstance from "../helpers/axiosInstance"

export default {
    getPriceHistories: (queries) => {
        return axiosInstance.get(`/story-api/storyPriceHistory?${Object.keys(queries).map(key => (`${key}=${queries[key]}`)).join('&')}`)
    }
}