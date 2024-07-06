export default {
    homePage: () => {
        return '/'
    },
    bookInfoPage: (book) => {
        return `/story/${book.id}`
    },
    chapterContentPage: (book, chapter) => {
        return `/story/${book.id}/chapter/${chapter.id}`
    },
    booksOfGenrePage: (genre) => {
        return `/genre/${genre.id}`
    },
    booksOfAuthorPage: (author) => {
        return `/author/${author.id}`
    },
    signInPage: () => {
        return '/sign-in'
    },
    verifyAccountPage: (account) => {
        return `/verify-account/${account.id}`
    },
    signUpPage: () => {
        return '/sign-up'
    },
    forgotPasswordPage: () => {
        return '/forgot-password'
    },
    settingPage: () => {
        return '/setting'
    },
    historyPage: () => {
        return '/history'
    },
    followPage: () => {
        return '/follow'
    },
    rankingPage: () => {
        return '/rank'
    }
}