import { useEffect, useState } from "react"
import { ACCOUNT_MANAGEMENT_TAB, RESET_PASSWORD_TAB } from "./constants"
import { useSelector } from "react-redux"
import { userSelectors } from "../../../../features/user.feature"

function Tabbar({
    value = ACCOUNT_MANAGEMENT_TAB,
    onChange = tab => { }
}) {
    const [activeTab, setActiveTab] = useState(value)
    const accountInfo = useSelector(userSelectors.selectAccountInfo)

    useEffect(() => {
        if (onChange) {
            onChange(activeTab)
        }
    }, [activeTab])

    return (
        <ul className="sm:flex sm:mb-4 md:block md:mb-0">
            <li
                className={
                    "py-2 space-x-2 cursor-pointer flex items-center px-4 rounded-[4px]"
                    + ` ${activeTab === ACCOUNT_MANAGEMENT_TAB ? 'bg-[#0000001a]' : 'hover:text-[#F08121]'}`
                }
                onClick={() => setActiveTab(ACCOUNT_MANAGEMENT_TAB)}
            >
                <span className="text-[1.2rem]">
                    <i className="fa-solid fa-circle-user"></i>
                </span>

                <span>
                    Quản lý tài khoản
                </span>
            </li>

            <li
                className={
                    "py-2 space-x-2 cursor-pointer flex items-center px-4 rounded-[4px]"
                    + ` ${activeTab === RESET_PASSWORD_TAB ? 'bg-[#0000001a]' : 'hover:text-[#F08121]'}`
                    + ` ${accountInfo && accountInfo.provider !== 'local' ? 'hidden' : ''}`
                }
                onClick={() => setActiveTab(RESET_PASSWORD_TAB)}
            >
                <span className="text-[1.2rem]">
                    <i className="fa-solid fa-key"></i>
                </span>

                <span>
                    Đổi mật khẩu
                </span>
            </li>
        </ul>
    )
}

export default Tabbar