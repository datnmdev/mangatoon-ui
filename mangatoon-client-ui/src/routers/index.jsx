import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom'
import ErrorPage from '../pages/ErrorPage'
import HomePage from '../pages/HomePage'
import Header from '../components/Header'
import Footer from '../components/Footer'
import CommonLayout from '../layouts/CommonLayout'
import BookInfoPage from '../pages/BookInfoPage'
import ChapterContentPage from '../pages/ChapterContentPage'
import BooksOfGenrePage from '../pages/BooksOfGenrePage'
import BooksOfAuthorPage from '../pages/BooksOfAuthorPage'
import SignInPage from '../pages/SignInPage'
import VerifyAccountPage from '../pages/VerifyAccountPage'
import SignUpPage from '../pages/SignUpPage'
import ForgotPasswordPage from '../pages/ForgotPasswordPage'
import SettingPage from '../pages/SettingPage'
import HistoryPage from '../pages/HistoryPage'
import Protected from '../components/Protected'
import FollowPage from '../pages/FollowPage'
import RankingPage from '../pages/RankingPage'

const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <CommonLayout
                header={(<Header />)}
                content={(<Outlet />)}
                footer={(<Footer />)}
            />
        ),
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <HomePage />
            },
            {
                path: '/story/:bookId',
                element: <BookInfoPage />
            },
            {
                path: '/story/:bookId/chapter/:chapterId',
                element: <ChapterContentPage />
            },
            {
                path: '/genre/:genreId',
                element: <BooksOfGenrePage />
            },
            {
                path: '/author/:authorId',
                element: <BooksOfAuthorPage />
            },
            {
                path: '/sign-in',
                element: <SignInPage />
            },
            {
                path: '/verify-account/:accountId',
                element: <VerifyAccountPage />
            },
            {
                path: '/sign-up',
                element: <SignUpPage />
            },
            {
                path: '/forgot-password',
                element: <ForgotPasswordPage />
            },
            {
                path: '/setting',
                element: (
                    <Protected>
                        <SettingPage />
                    </Protected>
                )
            },
            {
                path: '/history',
                element: (
                    <Protected>
                        <HistoryPage />
                    </Protected>
                )
            },
            {
                path: '/follow',
                element: (
                    <Protected>
                        <FollowPage />
                    </Protected>
                )
            },
            {
                path: '/rank',
                element: <RankingPage />
            }
        ]
    }
])

function AppRouter() {
    return (
        <RouterProvider router={router} />
    )
}

export default AppRouter