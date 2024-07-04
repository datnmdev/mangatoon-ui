import { RouterProvider, createBrowserRouter } from "react-router-dom"
import LoginPage from "../pages/LoginPage"
import ErrorPage from "../pages/ErrorPage"
import ManagePage from "../pages/ManagePage"
import CommonLayout from "../layouts/CommonLayout"

const router = createBrowserRouter([
    {
        path: '/',
        element: <CommonLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <LoginPage />,
            },
            {
                path: '/manage',
                element: <ManagePage />
            }
        ]
    }
])

function Router() {
    return (
        <RouterProvider router={router} />
    )
}

export default Router