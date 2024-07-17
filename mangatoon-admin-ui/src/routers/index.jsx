import { RouterProvider } from "react-router-dom"

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
    
        ]
    }
])

function AppRouter() {
    return (
        <RouterProvider router={router} />
    )
}

export default AppRouter