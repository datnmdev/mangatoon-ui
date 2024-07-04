import { useDispatch } from "react-redux"
import { logoutActions } from "../../features/logout/logoutSlice"
import { refreshTokenActions } from "../../features/refreshToken/refreshTokenSlice"

function Header() {
    const dispatch = useDispatch()

    function onLogoutClicked() {
        dispatch(logoutActions.submit())
        dispatch(refreshTokenActions.refetch())
    }

    return (
        <div className="flex justify-between items-center">
            <div>
                <img
                    className="w-[180px]"
                    src="/logos/logo.png"
                    alt="Mangatoon Logo"
                />
            </div>

            <div>
                <div className="group/parent relative cursor-pointer">
                    <img
                        className="w-[38px] h-[38px] object-cover object-center rounded-[50%] border-2"
                        src="/avatars/avatar-default.jpeg"
                        alt="Avatar"
                    />

                    <div className="hidden group-hover/parent:block absolute top-[calc(100%+8px)] right-0">
                        <div className="bg-transparent h-[8px] absolute w-full top-[-8px] "></div>
                        <ul className="min-w-[120px] shadow-[0_0_8px_#E8EBED,0_0_8px_#E8EBED] rounded-[4px]">
                            <li 
                                className="max-w-[160px] px-4 py-2 flex justify-center items-center space-x-2 hover:bg-[#E8EBED]"
                                onClick={onLogoutClicked}
                            >
                                <span>
                                    <i className="fa-solid fa-right-from-bracket"></i>
                                </span>

                                <span>Đăng xuất</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header