import { Outlet } from "react-router-dom"
import Authentication from "../../components/Authentication"

function CommonLayout() {
    return (
        <Authentication>
            <Outlet />
        </Authentication>
    )
}

export default CommonLayout