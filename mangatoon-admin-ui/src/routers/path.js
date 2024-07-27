export default {
    homePage: () => {
        return '/'
    },
    signInPage: () => {
        return '/sign-in'
    },
    storyManagementPage: () => {
        return '/story-management'
    },
    addStoryPage: () => {
        return '/story-management/add'
    },
    updateStoryPage: (storyId) => {
        return `/story-management/${storyId}/update`
    },
    settingPage: () => {
        return '/setting'
    },
    genreManagementPage: () => {
        return `/genre-management`
    },
    authorManagementPage: () => {
        return `/author-management`
    },
    accountManagementPage: () => {
        return `/account-management`
    }
}