import { useEffect, useState } from "react"
import validator from "validator"
import InputErrorMessage from "../InputErrorMessage"
import SubmitErrorMessage from "../SubmitErrorMessage"
import { useDispatch, useSelector } from "react-redux"
import { loginAsyncThunks, loginSelectors } from "../../features/login/loginSlice"
import Spinner from "../Spinner"
import { FAILED, IDLE, PENDING, SUCCEEDED } from '../../constants/fetchStatus'
import { useNavigate } from "react-router-dom"

function LoginForm() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const response = useSelector(loginSelectors.selectAll)
    const [status, setStatus] = useState(IDLE)
    const navigate = useNavigate()

    useEffect(() => {
        if (response) {
            localStorage.setItem('accessToken', response.accessToken)
            localStorage.setItem('refreshToken', response.refreshToken)
            navigate('/manage')
        }
    }, [response])

    async function onSubmitCliked(e) {
        e.preventDefault()
        try {
            setStatus(PENDING)
            await dispatch(loginAsyncThunks.submit({
                email,
                password
            })).unwrap()
            setStatus(SUCCEEDED)
        } catch (error) {
            setStatus(FAILED)
        }
    }

    return (
        <div className="bg-white min-w-[360px] min-h-[240px] rounded-[12px] px-10 py-6">
            <div className="flex justify-center">
                <img
                    className="w-[240px]"
                    src="/logos/logo.png"
                    alt="Logo"
                />
            </div>

            <div className="mt-8">
                {response && response.statusCode === 404
                    && (
                        <div>
                            <SubmitErrorMessage content={'Email hoặc mật khẩu không chính xác. Vui lòng thử lại!'} />
                        </div>
                    )}

                {response && response.statusCode === 400
                    && (
                        <div>
                            <SubmitErrorMessage content={'Tài khoản chưa được kích hoạt'} />
                        </div>
                    )}

                <div className="space-y-2 mt-4">
                    <div
                        className="relative overflow-hidden"
                        disabled={status === PENDING ? true : false}
                    >
                        <div className="z-0 absolute top-0 left-0 w-[52px] h-[44.78px] flex justify-center items-center text-[1.4rem] bg-[#E8EBED] rounded-tl-[8px] rounded-bl-[8px]">
                            <i className="fa-solid fa-user"></i>
                        </div>

                        <div>
                            <input
                                className="block w-full px-6 pl-[64px] py-3 border-[2px] rounded-[8px] outline-none"
                                type="text"
                                placeholder="Email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />

                            {/* {!validator.isEmail(email)
                                ? (
                                    <InputErrorMessage content={'Email không hợp lệ'} />
                                )
                                : null} */}
                        </div>
                    </div>

                    <div
                        className="relative overflow-hidden"
                        disabled={status === PENDING ? true : false}
                    >
                        <div className="z-0 absolute top-0 left-0 w-[52px] h-[44.78px] flex justify-center items-center text-[1.4rem] bg-[#E8EBED] rounded-tl-[8px] rounded-bl-[8px]">
                            <i className="fa-solid fa-lock"></i>
                        </div>

                        <div>
                            <input
                                className="block w-full px-6 pl-[64px] py-3 border-[2px] rounded-[8px] outline-none"
                                type="password"
                                placeholder="Mật khẩu"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />

                            {/* {!(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).*$/).test(password)
                                ? (
                                    <InputErrorMessage content={'Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ, số và ký tự đặc biệt'} />
                                )
                                : null} */}
                        </div>
                    </div>
                </div>

                <div className="mt-6">
                    <button
                        className={
                            "bg-[#FC456C] px-6 py-4 w-full rounded-[8px] text-white font-[600] space-x-2 flex justify-center items-center"
                            + ` ${!validator.isEmail(email) || !(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).*$/).test(password) ? 'opacity-80' : null}`
                        }
                        disabled={status === PENDING ? true : false}
                        onClick={onSubmitCliked}
                    >
                        <span className={
                            "flex items-center"
                            + ` ${status === PENDING ? 'inline-block' : 'hidden'}`
                        }>
                            <Spinner
                                size="24px"
                            />
                        </span>

                        <span>
                            Đăng nhập
                        </span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default LoginForm