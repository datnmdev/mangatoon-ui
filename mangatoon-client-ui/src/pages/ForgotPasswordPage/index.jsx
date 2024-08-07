import { useEffect, useState } from "react"
import { Link, useNavigate } from 'react-router-dom'
import Button from "../../components/Button"
import Input from "../../components/Input"
import IconButton from "../../components/IconButton"
import Alert from "../../components/Alert"
import { ERROR } from "../../components/Alert/constants"
import useSendCodeToResetPassword from "./hooks/useSendCodeToResetPassword"
import useVerifyCodeToResetPassword from "./hooks/useVerifyCodeToResetPassword"
import useResetPassword from "./hooks/useResetPassword"
import { PENDING, SUCCEEDED } from "../../constants/fetchStatus.constant"
import useValidateFormOfStep1 from "./hooks/useValidateFormOfStep1"
import useValidateFormOfStep3 from "./hooks/useValidateFormOfStep3"
import ErrorMessage from "../../components/ErrorMessage"
import location from "../../routers/location"

function ForgotPasswordPage() {
    const navigate = useNavigate()
    const [data, setData] = useState({
        email: '',
        otpCode: '',
        password: '',
        repeatPassword: '',
        code: ''
    })
    const [step, setStep] = useState(1)
    const {
        data: sendCodeToResetPasswordData,
        status: sendCodeToResetPasswordStatus,
        setSubmit: setSendCodeToResetPasswordSubmit
    } = useSendCodeToResetPassword(data)
    const {
        data: verifyCodeToResetPasswordData,
        status: verifyCodeToResetPasswordStatus,
        setSubmit: setVerifyCodeToResetPasswordSubmit
    } = useVerifyCodeToResetPassword(data)
    const {
        data: resetPasswordData,
        status: resetPasswordStatus,
        setSubmit: setResetPasswordSubmit
    } = useResetPassword(data)
    const { error: formOfStep1Error, isValid: isFormOfStep1Valid } = useValidateFormOfStep1(data)
    const { error: formOfStep3Error, isValid: isFormOfStep3Valid } = useValidateFormOfStep3(data)

    useEffect(() => {
        if (sendCodeToResetPasswordStatus === SUCCEEDED) {
            if (sendCodeToResetPasswordData.data) {
                setStep(2)
            }
        }
    }, [sendCodeToResetPasswordStatus])

    useEffect(() => {
        if (verifyCodeToResetPasswordStatus === SUCCEEDED) {
            if (verifyCodeToResetPasswordData.data) {
                setData({
                    ...data,
                    code: verifyCodeToResetPasswordData.data.code
                })
                setStep(3)
            }
        }
    }, [verifyCodeToResetPasswordStatus])

    useEffect(() => {
        if (resetPasswordStatus === SUCCEEDED) {
            if (resetPasswordData.data) {
                setStep(4)
            }
        }
    }, [resetPasswordStatus])

    if (step === 4) {
        return (
            <div className="flex justify-center my-8">
                <div className="bg-white w-[420px] p-8 rounded-[8px]">
                    <div className="flex justify-center">
                        <div className="flex justify-between items-center space-x-4">
                            <img
                                width={32}
                                src='/icons/check.png'
                                alt='Check Icon'
                            />
                            <span className="grow">Đổi mật khẩu thành công</span>
                        </div>
                    </div>

                    <div className="mt-4 flex justify-center">
                        <Button
                            onClick={() => navigate(location.signInPage())}
                        >
                            Quay trở lại trang đăng nhập
                        </Button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="flex justify-center my-8">
            <div className="bg-white min-w-[420px] p-8 rounded-[8px]">
                <div className="flex justify-between items-center">
                    {step != 1 && step != 4
                        && (
                            <div>
                                <IconButton
                                    icon={(<i className="fa-solid fa-arrow-left"></i>)}
                                    backgroundColor="transparent"
                                    color="black"
                                    sx={{
                                        fontSize: '1.4rem',
                                        padding: 0
                                    }}
                                    onClick={() => setStep(step - 1)}
                                />
                            </div>
                        )}

                    <div className="grow font-[450] text-center">
                        LẤY LẠI MẬT KHẨU
                    </div>
                </div>

                {step === 1
                    && (
                        <div className="mt-6 space-y-2">
                            <div>
                                <div>Email</div>
                                <Input
                                    value={data.email}
                                    name="email"
                                    onChange={e => setData({
                                        ...data,
                                        email: e.target.value
                                    })}
                                    isValid={(data.email !== '' && formOfStep1Error.email) ? false : true}
                                />

                                {formOfStep1Error.email
                                    && (
                                        <ErrorMessage>{formOfStep1Error.email}</ErrorMessage>
                                    )}
                            </div>

                            <div className="pt-2">
                                <Button
                                    sx={{
                                        display: 'block',
                                        width: '100%'
                                    }}
                                    disabled={!isFormOfStep1Valid || sendCodeToResetPasswordStatus === PENDING}
                                    onClick={() => setSendCodeToResetPasswordSubmit(true)}
                                >
                                    {sendCodeToResetPasswordStatus === PENDING ? 'Đang gửi đi...' : 'Gửi đi'}
                                </Button>
                            </div>

                            <div className="text-center pt-2">
                                <Link
                                    className="text-blue-700"
                                    to={location.signInPage()}
                                >
                                    Trở lại trang đăng nhập
                                </Link>
                            </div>
                        </div>
                    )}

                {step === 2
                    && (
                        <div className="mt-6 space-y-4">
                            <div>
                                <div className="flex justify-center">
                                    <img
                                        width={84}
                                        src='/icons/gmail.png'
                                        alt="Gmail Icon"
                                    />
                                </div>

                                <div className="text-center text-[0.95rem] font-[400]">Mã gồm 6 chữ số đã được gửi đến hộp thư của bạn</div>
                            </div>

                            {verifyCodeToResetPasswordData?.data === false
                                && (
                                    <div>
                                        <Alert
                                            type={ERROR}
                                        >
                                            Mã xác nhận không chính xác. Vui lòng thử lại
                                        </Alert>
                                    </div>
                                )}

                            <div>
                                <div>Mã OTP</div>
                                <Input
                                    placeholder='######'
                                    name="otpCode"
                                    value={data.otpCode}
                                    onChange={e => setData({
                                        ...data,
                                        otpCode: e.target.value
                                    })}
                                />
                            </div>

                            <div>
                                <Button
                                    sx={{
                                        display: 'block',
                                        width: '100%'
                                    }}
                                    disabled={data.otpCode.length !== 6 || verifyCodeToResetPasswordStatus === PENDING}
                                    onClick={() => setVerifyCodeToResetPasswordSubmit(true)}
                                >
                                    {verifyCodeToResetPasswordStatus === PENDING ? 'Đang xác nhận...' : 'Xác nhận'}
                                </Button>
                            </div>

                            <div className="text-center space-x-1">
                                <span>Tôi không nhận được mã?</span>
                                <span
                                    className="text-blue-700 cursor-pointer hover:underline"
                                    onClick={() => setSendCodeToResetPasswordSubmit(true)}
                                >
                                    Gửi lại mã
                                </span>
                            </div>
                        </div>
                    )}

                {step === 3
                    && (
                        <div className="mt-6 space-y-2">
                            <div>
                                <div>
                                    <div>Mật khẩu mới</div>
                                    <Input
                                        type="password"
                                        name="password"
                                        value={data.password}
                                        onChange={e => setData({
                                            ...data,
                                            password: e.target.value
                                        })}
                                        isValid={(data.password !== '' && formOfStep3Error.password) ? false : true}
                                    />

                                    {formOfStep3Error.password
                                        && (
                                            <ErrorMessage>{formOfStep3Error.password}</ErrorMessage>
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
                                        isValid={(data.repeatPassword !== '' && formOfStep3Error.repeatPassword) ? false : true}
                                    />

                                    {formOfStep3Error.repeatPassword
                                        && (
                                            <ErrorMessage>{formOfStep3Error.repeatPassword}</ErrorMessage>
                                        )}
                                </div>
                            </div>

                            <div className="pt-2">
                                <Button
                                    sx={{
                                        display: 'block',
                                        width: '100%'
                                    }}
                                    disabled={!isFormOfStep3Valid || resetPasswordStatus === PENDING}
                                    onClick={() => setResetPasswordSubmit(true)}
                                >
                                    {resetPasswordStatus === PENDING ? 'Đang áp dụng...' : 'Áp dụng'}
                                </Button>
                            </div>
                        </div>
                    )}
            </div>
        </div>
    )
}

export default ForgotPasswordPage