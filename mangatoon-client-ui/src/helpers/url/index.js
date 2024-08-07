export function urlOfStoryServiceGenerator(relativePath) {
    return import.meta.env.VITE_STORY_SERVICE_URL + relativePath
}

export function urlOfUserServiceGenerator(relativePath) {
    return import.meta.env.VITE_USER_SERVICE_URL + relativePath
}