import { useNavigate } from "react-router-dom"
import BorderedButton from "../BorderedButton"
import path from "../../routers/path"

function Header() {
    const navigate = useNavigate()

    return (
        <div className="flex justify-between px-4 py-6 bg-[rgba(0,0,0,0.02)]">
            <div>
                <img
                    src="/logos/mangatoon.png"
                    alt="Logo"
                />
            </div>

            <div>
                <BorderedButton
                    onClick={() => navigate(path.signInPage())}
                >
                    Chuyển đến trang quản lý
                </BorderedButton>
            </div>
        </div>
    )
}

export default Header