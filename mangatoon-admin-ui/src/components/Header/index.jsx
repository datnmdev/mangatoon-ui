import { Link, useNavigate } from "react-router-dom"
import BorderedButton from "../BorderedButton"
import path from "../../routers/path"
import { useSelector } from "react-redux"
import { userSelectors } from "../../features/user.feature"
import Profile from "./components/Profile"

function Header() {
    const navigate = useNavigate()
    const tokens = useSelector(userSelectors.selectTokens)

    return (
        <div className="flex justify-between px-4 bg-[rgba(0,0,0,0.02)] leading-[64px]">
            <div className="flex items-center space-x-6">
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

                <ul className="flex items-center">
                    <li>
                        <Link 
                            className="block text-white font-[500] px-4 leading-[64px] hover:bg-[rgba(0,0,0,0.4)]"
                            to={path.storyManagementPage()}
                        >
                            TRUYỆN
                        </Link>
                    </li>

                    <li>
                        <Link 
                            className="block text-white font-[500] px-4 leading-[64px] hover:bg-[rgba(0,0,0,0.4)]"
                            to={path.genreManagementPage()}
                        >
                            THỂ LOẠI
                        </Link>
                    </li>

                    <li>
                        <Link 
                            className="block text-white font-[500] px-4 leading-[64px] hover:bg-[rgba(0,0,0,0.4)]"
                            to={path.authorManagementPage()}
                        >
                            TÁC GIẢ
                        </Link>
                    </li>

                    <li>
                        <Link 
                            className="block text-white font-[500] px-4 leading-[64px] hover:bg-[rgba(0,0,0,0.4)]"
                            to={path.accountManagementPage()}
                        >
                            TÀI KHOẢN
                        </Link>
                    </li>
                </ul>
            </div>

            <div className="flex items-center leading-normal">
                {!tokens
                    && (
                        <div>
                            <BorderedButton
                                onClick={() => navigate(path.storyManagementPage())}
                            >
                                Chuyển đến trang quản lý
                            </BorderedButton>
                        </div>
                    )}

                {tokens
                    && (
                        <Profile />
                    )}
            </div>
        </div>
    )
}

export default Header