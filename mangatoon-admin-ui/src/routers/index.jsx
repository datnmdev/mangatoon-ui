import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom"
import ErrorPage from "../pages/ErrorPage"
import Header from "../components/Header"
import Footer from "../components/Footer"
import HomePage from "../pages/HomePage"
import CommonLayout from "../layouts/CommonLayout"
import SignInPage from "../pages/SignInPage"
import StoryManagementPage from "../pages/StoryManagementPage"
import Protected from "../components/Protected"
import SettingPage from "../pages/SettingPage"

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
                path: 'setting',
                element: (
                    <Protected>
                        <CommonLayout
                            header={(<Header />)}
                            content={(<SettingPage />)}
                        />
                    </Protected>
                )
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