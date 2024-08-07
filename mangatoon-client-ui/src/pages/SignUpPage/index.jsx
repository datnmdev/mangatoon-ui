import { useEffect, useRef, useState } from "react"
import { useDispatch } from 'react-redux'
import moment from 'moment'
import Button from "../../components/Button"
import IconButton from "../../components/IconButton"
import Input from "../../components/Input"
import location from "../../routers/location"
import { Link, useNavigate } from "react-router-dom"
import Select from "../../components/Select"
import ErrorMessage from "../../components/ErrorMessage"
import useValidate from "./hooks/useValidate"
import useSignUp from "./hooks/useSignUp"
import { PENDING, SUCCEEDED } from "../../constants/fetchStatus.constant"
import signInWithGoogle from "../../helpers/firebase/signInWithGoogle"
import signInWithFacebook from "../../helpers/firebase/signInWithFacebook"
import { userActions } from "../../features/user.feature"
import api from "../../api"
import signOut from "../../helpers/firebase/signOut"

function SignUpPage() {
    const dispatch = useDispatch()
    const [data, setData] = useState({
        email: '',
        name: '',
        password: '',
        dob: '',
        gender: 0,
        repeatPassword: ''
    })
    const dobRef = useRef(null)
    const { error, isValid } = useValidate(data)
    const { data: signUpData, status, setSubmit } = useSignUp(data)
    const navigate = useNavigate()

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
        dobRef.current.setAttribute('max', moment().format('YYYY-MM-DD'))
    }, [])

    useEffect(() => {
        if (status === SUCCEEDED) {
            if (signUpData.data) {
                navigate(location.verifyAccountPage(signUpData.data))
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
                    <div>
                        <div>Email (*)</div>
                        <Input
                            value={data.email}
                            name="email"
                            onChange={e => setData({
                                ...data,
                                email: e.target.value
                            })}
                            isValid={(data.email !== '' && error.email) ? false : true}
                        />

                        {error.email
                            && (
                                <ErrorMessage>{error.email}</ErrorMessage>
                            )}
                    </div>

                    <div>
                        <div>Họ và tên</div>
                        <Input
                            value={data.name}
                            name="name"
                            onChange={e => setData({
                                ...data,
                                name: e.target.value
                            })}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-x-2">
                        <div>
                            <div>Ngày sinh</div>
                            <Input
                                ref={dobRef}
                                name="dob"
                                type="date"
                                sx={{
                                    height: '36.18px'
                                }}
                                value={data.dob}
                                onChange={e => setData({
                                    ...data,
                                    dob: e.target.value
                                })}
                            />
                        </div>
                        <div>
                            <div>Giới tính</div>
                            <Select
                                options={([
                                    {
                                        name: 'Nam',
                                        value: 0
                                    },
                                    {
                                        name: 'Nữ',
                                        value: 1
                                    }
                                ])}
                                value={data.gender}
                                onChange={e => setData({
                                    ...data,
                                    gender: Number(e.target.value)
                                })}
                                sx={{
                                    display: 'block',
                                    width: '100%',
                                    height: '36.18px'
                                }}
                            />
                        </div>
                    </div>

                    <div>
                        <div>
                            <div>Mật khẩu (*)</div>
                            <Input
                                type="password"
                                name="password"
                                value={data.password}
                                onChange={e => setData({
                                    ...data,
                                    password: e.target.value
                                })}
                                isValid={(data.password !== '' && error.password) ? false : true}
                            />

                            {error.password
                                && (
                                    <ErrorMessage>{error.password}</ErrorMessage>
                                )}
                        </div>
                    </div>

                    <div>
                        <div>
                            <div>Nhập lại mật khẩu (*)</div>
                            <Input
                                type="password"
                                name="repeat-password"
                                value={data.repeatPassword}
                                onChange={e => setData({
                                    ...data,
                                    repeatPassword: e.target.value
                                })}
                                isValid={(data.repeatPassword !== '' && error.repeatPassword) ? false : true}
                            />

                            {error.repeatPassword
                                && (
                                    <ErrorMessage>{error.repeatPassword}</ErrorMessage>
                                )}
                        </div>
                    </div>

                    <div className="pt-2">
                        <Button
                            sx={{
                                display: 'block',
                                width: '100%'
                            }}
                            disabled={!isValid || status === PENDING}
                            onClick={() => setSubmit(true)}
                        >
                            {status === PENDING ? 'Đang đăng ký...' : 'Đăng ký'}
                        </Button>
                    </div>

                    <div className="py-2">
                        <div className="text-center text-[#655f5f] ">HOẶC ĐĂNG KÝ VỚI</div>
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
                        <span>Bạn đã có tài khoản?</span>
                        <Link
                            className="text-blue-700"
                            to={location.signInPage()}
                        >
                            Đăng nhập ngay
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUpPage