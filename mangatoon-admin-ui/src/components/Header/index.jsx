import { Link, useNavigate } from "react-router-dom"
import BorderedButton from "../BorderedButton"
import path from "../../routers/path"

function Header() {
    const navigate = useNavigate()

    return (
        <div className="flex justify-between px-4 py-6 bg-[rgba(0,0,0,0.02)]">
            <div>
                <Link
                    to={path.homePage()}
                >
                    <img
                        src="/logos/mangatoon.png"
                        alt="Logo"
                    />
                </Link>
            </div>

            <div>
                <BorderedButton
                    onClick={() => navigate(path.storyManagementPage())}
                >
                    Chuyển đến trang quản lý
                </BorderedButton>
            </div>
        </div>
    )
}

export default Header