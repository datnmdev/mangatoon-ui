import { RouterProvider, createBrowserRouter } from "react-router-dom"
import ErrorPage from "../pages/ErrorPage"
import Header from "../components/Header"
import Footer from "../components/Footer"
import HomePage from "../pages/HomePage"
import CommonLayout from "../layouts/CommonLayout"
import SignInPage from "../pages/SignInPage"
import StoryManagementPage from "../pages/StoryManagementPage"
import Protected from "../components/Protected"
import SettingPage from "../pages/SettingPage"
import AddStoryPage from "../pages/AddStoryPage"
import UpdateStoryPage from "../pages/UpdateStoryPage"
import GenreManagementPage from "../pages/GenreManagementPage"
import AuthorManagementPage from "../pages/AuthorManagementPage"
import AccountManagementPage from "../pages/AccountManagementPage"

const router = createBrowserRouter([
    {
        path: '/',
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: (
                    <CommonLayout
                        header={(<Header />)}
                        content={(<HomePage />)}
                        footer={(<Footer />)}
                    />
                )
            },
            {
                path: 'sign-in',
                element: (
                    <CommonLayout
                        header={(<Header />)}
                        content={(<SignInPage />)}
                        footer={(<Footer />)}
                    />
                )
            },
            {
                path: 'story-management',
                element: (
                    <Protected>
                        <CommonLayout
                            header={(<Header />)}
                            content={(<StoryManagementPage />)}
                        />
                    </Protected>
                )
            },
            {
                path: 'story-management/add',
                element: (
                    <Protected>
                        <CommonLayout
                            header={(<Header />)}
                            content={(<AddStoryPage />)}
                        />
                    </Protected>
                )
            },
            {
                path: 'story-management/:storyId/update',
                element: (
                    <Protected>
                        <CommonLayout
                            header={(<Header />)}
                            content={(<UpdateStoryPage />)}
                        />
                    </Protected>
                )
            },
            {
                path: 'setting',
                element: (
                    <Protected>
                        <CommonLayout
                            header={(<Header />)}
                            content={(<SettingPage />)}
                        />
                    </Protected>
                )
            },
            {
                path: 'genre-management',
                element: (
                    <Protected>
                        <CommonLayout
                            header={(<Header />)}
                            content={(<GenreManagementPage />)}
                        />
                    </Protected>
                )
            },
            {
                path: 'author-management',
                element: (
                    <Protected>
                        <CommonLayout
                            header={(<Header />)}
                            content={(<AuthorManagementPage />)}
                        />
                    </Protected>
                )
            },
            {
                path: 'account-management',
                element: (
                    <Protected>
                        <CommonLayout
                            header={(<Header />)}
                            content={(<AccountManagementPage />)}
                        />
                    </Protected>
                )
            },
        ]
    }
])

function AppRouter() {
    return (
        <RouterProvider router={router} />
    )
}

export default AppRouter