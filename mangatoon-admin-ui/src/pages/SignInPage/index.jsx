import { useEffect, useState } from "react"
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Alert from "../../components/Alert"
import { ERROR } from "../../components/Alert/constants"
import useSignIn from "./hooks/useSignIn"
import { PENDING, SUCCEEDED } from "../../constants/fetchStatus.constant"
import Button from "../../components/Button"
import Input from "../../components/Input"
import { LOCKED, UNACTIVATED } from "./constants/accountStatus.constant"
import { ADMIN } from "./constants/accountRole.constant"
import { userActions } from "../../features/user.feature"
import path from "../../routers/path"

function SignInPage() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [data, setData] = useState({
        email: '',
        password: ''
    })
    const { data: loginData, status, setSubmit } = useSignIn(data)
    const [alert, setAlert] = useState(undefined)

    useEffect(() => {
        if (status === SUCCEEDED) {
            if (loginData.data) {
                if (loginData.data.tokens) {
                    dispatch(userActions.addTokens(loginData.data.tokens))
                    navigate(path.storyManagementPage())
                    window.location.reload()
                } else {
                    if (loginData.data.account) {
                        if (loginData.data.account.role != ADMIN) {
                            setAlert('Email hoặc mật khẩu không đúng. Vui lòng thử lại')
                        } else if (loginData.data.account.status === LOCKED) {
                            setAlert('Tài khoản của bạn đã bị khoá. Vui lòng liên hệ với admin để mở khoá')
                        } else if (loginData.data.account.status === UNACTIVATED) {
                            setAlert('Tài khoản của bạn chưa được kích hoạt. Vui lòng liên hệ với admin để được kích hoạt')
                        }
                    } else {
                        setAlert('Email hoặc mật khẩu không đúng. Vui lòng thử lại')
                    }
                }
            }
        }
    }, [status])

    return (
        <div className="grow flex justify-center items-start mt-20">
            <div className="bg-white min-w-[420px] p-8 rounded-[8px]">
                <div className="flex justify-center">
                    <img
                        src="/logos/mangatoon.png"
                        alt="Logo"
                    />
                </div>

                <div className="mt-6 space-y-2">
                    {alert
                        && (
                            <div>
                                <Alert
                                    type={ERROR}
                                >
                                    {alert}
                                </Alert>
                            </div>
                        )}

                    <div>
                        <div>Email</div>
                        <Input
                            value={data.email}
                            name="email"
                            onChange={e => setData({
                                ...data,
                                email: e.target.value
                            })}
                        />
                    </div>

                    <div>
                        <div>
                            <div>Mật khẩu</div>
                            <Input
                                type="password"
                                name="password"
                                value={data.password}
                                onChange={e => setData({
                                    ...data,
                                    password: e.target.value
                                })}
                            />
                        </div>
                    </div>

                    <div>
                        <Button
                            sx={{
                                display: 'block',
                                width: '100%'
                            }}
                            disabled={status === PENDING ? true : false}
                            onClick={() => setSubmit(true)}
                        >
                            {status === PENDING ? 'Đang đăng nhập...' : 'Đăng nhập'}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignInPage