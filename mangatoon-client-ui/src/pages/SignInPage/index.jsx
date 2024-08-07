import { useEffect, useState } from "react"
import Button from "../../components/Button"
import IconButton from "../../components/IconButton"
import Input from "../../components/Input"
import { Link, useNavigate } from 'react-router-dom'
import { PENDING, SUCCEEDED } from "../../constants/fetchStatus.constant"
import location from "../../routers/location"
import Alert from "../../components/Alert"
import { ERROR } from "../../components/Alert/constants"
import { LOCKED, UNACTIVATED } from "./constants/accountStatus.constant"
import useSignIn from "./hooks/useSignIn"
import signInWithGoogle from "../../helpers/firebase/signInWithGoogle"
import signInWithFacebook from "../../helpers/firebase/signInWithFacebook"
import api from "../../api"
import signOut from "../../helpers/firebase/signOut"
import { userActions } from "../../features/user.feature"
import { useDispatch } from "react-redux"

function SignInPage() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [data, setData] = useState({
        email: '',
        password: ''
    })
    const { data: loginData, status, setSubmit } = useSignIn(data)
    const [alert, setAlert] = useState(undefined)

    async function onSignInWithGoogleClick() {
        try {
            const userCredential = await signInWithGoogle()
            const res = (await api.user.signInWithGoogle({
                accessToken: await userCredential.user.getIdToken(true)
            })).data

            dispatch(userActions.addTokens(res.data))
            await signOut()
            navigate(location.homePage())
            window.location.reload()
        } catch (error) {
            console.log(error)
        }
    }

    async function onSignInWithFacebookClick() {
        try {
            const userCredential = await signInWithFacebook()
            const res = (await api.user.signInWithFacebook({
                accessToken: await userCredential.user.getIdToken(true)
            })).data

            dispatch(userActions.addTokens(res.data))
            await signOut()
            navigate(location.homePage())
            window.location.reload()
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (status === SUCCEEDED) {
            if (loginData.data) {
                if (loginData.data.tokens) {
                    dispatch(userActions.addTokens(loginData.data.tokens))
                    navigate(location.homePage())
                    window.location.reload()
                } else {
                    if (loginData.data.account) {
                        if (loginData.data.account.status === LOCKED) {
                            setAlert('Tài khoản của bạn đã bị khoá. Vui lòng liên hệ với admin để mở khoá')
                        } else if (loginData.data.account.status === UNACTIVATED) {
                            navigate(location.verifyAccountPage(loginData.data.account))
                        }
                    } else {
                        setAlert('Email hoặc mật khẩu không đúng. Vui lòng thử lại')
                    }
                }
            }
        }
    }, [status])

    return (
        <div className="flex justify-center my-8">
            <div className="bg-white w-[420px] p-8 rounded-[8px]">
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
                                    textAlign="left"
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

                        <div className="flex justify-end">
                            <Link
                                to={location.forgotPasswordPage()}
                                className="block py-1 text-blue-700"
                            >
                                Quên mật khẩu?
                            </Link>
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

                    <div className="py-2">
                        <div className="text-center text-[#655f5f] ">HOẶC ĐĂNG NHẬP VỚI</div>
                        <div className="flex justify-center items-center py-2 space-x-2">
                            <IconButton
                                icon={(
                                    <img
                                        src="/icons/google.png"
                                    />
                                )}
                                backgroundColor="#E8EBED"
                                sx={{
                                    width: '48px',
                                    height: '48px',
                                    borderRadius: '100%'
                                }}
                                onClick={onSignInWithGoogleClick}
                            />

                            <IconButton
                                icon={(
                                    <img
                                        src="/icons/facebook.png"
                                    />
                                )}
                                backgroundColor="#E8EBED"
                                sx={{
                                    width: '48px',
                                    height: '48px',
                                    borderRadius: '100%'
                                }}
                                onClick={onSignInWithFacebookClick}
                            />
                        </div>
                    </div>

                    <div className="text-center space-x-2">
                        <span>Bạn chưa có tài khoản?</span>
                        <Link
                            className="text-blue-700"
                            to={location.signUpPage()}
                        >
                            Đăng ký ngay
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignInPage