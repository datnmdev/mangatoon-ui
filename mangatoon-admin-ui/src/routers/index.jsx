import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom"
import ErrorPage from "../pages/ErrorPage"
import Header from "../components/Header"
import Footer from "../components/Footer"
import HomePage from "../pages/HomePage"
import HomePageLayout from "../layouts/HomePageLayout"
import SignInPage from "../pages/SignInPage"

const router = createBrowserRouter([
    {
        path: '/',
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: (
                    <HomePageLayout
                        header={(<Header />)}
                        content={(<HomePage />)}
                        footer={(<Footer />)}
                    />
                )
            },
            {
                path: 'sign-in',
                element: <SignInPage />
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