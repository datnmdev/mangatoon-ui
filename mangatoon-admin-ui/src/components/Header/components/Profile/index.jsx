import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { userActions, userAsyncThunks, userSelectors } from "../../../../features/user.feature"
import useGetProfile from "./hooks/useGetProfile"
import useSignOut from "./hooks/useSignOut"
import { PENDING, SUCCEEDED } from "../../../../constants/fetchStatus.constant"
import SkeletonProfile from "./SkeletonProfile"
import path from "../../../../routers/path"

function Profile() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [hidden, setHidden] = useState(true)
    const profileRef = useRef(null)
    const tokens = useSelector(userSelectors.selectTokens)
    const { data: getProfileData, status: getProfileStatus, setSubmit: setGetProfileSubmit } = useGetProfile()
    const { data: signOutData, status: signOutStatus, setSubmit: setSignOutSubmit } = useSignOut()

    useEffect(() => {
        if (tokens) {
            dispatch(userAsyncThunks.getAccountInfo())
            setGetProfileSubmit(true)
        }
    }, [tokens])

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setHidden(true)
            }
        }

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [])

    useEffect(() => {
        if (signOutStatus === SUCCEEDED) {
            if (signOutData.data) {
                dispatch(userActions.removeTokens())
                dispatch(userActions.removeProfile())
                dispatch(userActions.removeAccountInfo())
                navigate(path.homePage())
            }
        }
    }, [signOutStatus])

    if (getProfileStatus === PENDING || !getProfileData) {
        return (
            <SkeletonProfile />
        )
    }

    return (
        <div
            ref={profileRef}
            className='relative'
        >
            <img
                className='w-12 h-12 rounded-[50%] object-cover object-center border-2 cursor-pointer'
                src={getProfileData.avatarUrl || "/imgs/user-default.jpg"}
                alt="Avatar"
                onClick={() => setHidden(!hidden)}
            />

            {!hidden
                && (
                    <ul className='absolute top-[calc(100%+8px)] right-0 bg-white min-w-[340px] shadow-[1px_1px_8px_#E8EBED] rounded-[6px] z-[1] overflow-hidden'>
                        <li className="px-4 py-8 bg-[#0000000a]">
                            <div className="flex justify-center">
                                <img
                                    className='w-20 h-20 rounded-[50%] object-cover object-center border-2'
                                    src={getProfileData.avatarUrl || "/imgs/user-default.jpg"}
                                    alt="Avatar"
                                />
                            </div>

                            <div className="flex justify-center mt-4">
                                <span className="font-[450] text-[1.2rem]">{getProfileData.name}</span>
                            </div>
                        </li>

                        <li 
                            className="px-4 py-3 hover:text-[#F08121] cursor-pointer space-x-2"
                            onClick={() => {
                                navigate(path.settingPage())
                                setHidden(true)
                            }}
                        >
                            <span>
                                <i className="fa-solid fa-gear"></i>
                            </span>

                            <span>Cài đặt thông tin</span>
                        </li>

                        <li
                            className="px-4 py-3 hover:text-[#F08121] cursor-pointer space-x-2"
                            onClick={() => {
                                setSignOutSubmit(true)
                                setHidden(true)
                            }}
                        >
                            <span>
                                <i className="fa-solid fa-right-from-bracket"></i>
                            </span>

                            <span>Đăng xuất</span>
                        </li>
                    </ul>
                )}
        </div>
    )
}

export default Profile