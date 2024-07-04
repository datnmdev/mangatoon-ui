import { useRouteError } from "react-router-dom"

function ErrorPage() {
    const error = useRouteError()

    return (
        <div>{error.statusText || error.message}</div>
    )
}

export default ErrorPage