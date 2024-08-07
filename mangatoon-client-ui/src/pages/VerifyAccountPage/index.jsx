import { useEffect, useState } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import Button from "../../components/Button"
import Input from "../../components/Input"
import api from "../../api"
import useVerifyAccount from "./hooks/useVerifyAccount"
import { SUCCEEDED } from "../../constants/fetchStatus.constant"
import location from "../../routers/location"
import Alert from "../../components/Alert"
import { ERROR } from "../../components/Alert/constants"

function VerifyAccountPage() {
    const navigate = useNavigate()
    const { accountId } = useParams()
    const [resend, setResend] = useState(true)
    const [data, setData] = useState({
        id: Number(accountId),
        otpCode: ''
    })
    const { data: verifyAccountData, status, setSubmit } = useVerifyAccount(data)

    useEffect(() => {
        async function sendOTP() {
            try {
                await api.user.sendOTP({
                    id: Number(accountId)
                })
            } catch (error) {

            }
            setResend(false)
        }

        if (resend) {
            sendOTP()
        }
    }, [resend])

    if (status === SUCCEEDED && verifyAccountData.data) {
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
                            <span className="grow">Xác thực tài khoản thành công</span>
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
                <div className="flex justify-center">
                    <img
                        src="/logos/mangatoon.png"
                        alt="Logo"
                    />
                </div>

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

                    {verifyAccountData?.data === false
                        && (
                            <div>
                                <Alert
                                    type={ERROR}
                                    textAlign="left"
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
                            disabled={data.otpCode.length !== 6 ? true : false}
                            onClick={() => setSubmit(true)}
                        >
                            Xác nhận tài khoản
                        </Button>
                    </div>

                    <div className="text-center space-x-1">
                        <span>Tôi không nhận được mã?</span>
                        <span
                            className="text-blue-700 cursor-pointer hover:underline"
                            onClick={() => setResend(true)}
                        >
                            Gửi lại mã
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VerifyAccountPage