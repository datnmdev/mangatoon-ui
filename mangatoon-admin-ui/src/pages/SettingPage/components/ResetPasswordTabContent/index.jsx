import { useEffect, useState } from "react"
import Input from "../../../../components/Input"
import useValidateResetPasswordForm from "./hooks/useValidateResetPasswordForm"
import useChangePassword from "./hooks/useChangePassword"
import { PENDING, SUCCEEDED } from "../../../../constants/fetchStatus.constant"
import ErrorMessage from "../../../../components/ErrorMessage"
import Button from "../../../../components/Button"
import { useDispatch } from "react-redux"
import { toastActions } from "../../../../features/toast.feature"
import { ERROR, SUCCESS } from "../../../../components/Toast/constants"

function ResetPasswordTabContent() {
    const dispatch = useDispatch()
    const [data, setData] = useState({
        oldPassword: '',
        newPassword: '',
        repeatNewPassword: ''
    })
    const { error, isValid } = useValidateResetPasswordForm(data)
    const { data: changePasswordData, status: changePasswordStatus, setSubmit: setChangePasswordSubmit } = useChangePassword(data)

    useEffect(() => {
        if (changePasswordStatus === SUCCEEDED) {
            if (changePasswordData.data) {
                dispatch(toastActions.addToast({
                    type: SUCCESS,
                    title: 'Thay đổi mật khẩu thành công!',
                    message: 'Mật khẩu mới đã được áp dụng.'
                }))
            } else {
                dispatch(toastActions.addToast({
                    type: ERROR,
                    title: 'Thay đổi mật khẩu thất bại!',
                    message: 'Mật khẩu hiện tại không chính xác vui lòng thử lại.'
                }))
            }
        }
    }, [changePasswordStatus])

    return (
        <div className="mt-6 space-y-2">
            <div>
                <div>
                    <div>Mật khẩu hiện tại</div>
                    <Input
                        type="password"
                        value={data.oldPassword}
                        onChange={e => setData({
                            ...data,
                            oldPassword: e.target.value
                        })}
                        isValid={(data.oldPassword != '' && error.oldPassword) ? false : true}
                    />

                    {error.oldPassword
                        && (
                            <ErrorMessage>{error.oldPassword}</ErrorMessage>
                        )}
                </div>
            </div>

            <div>
                <div>
                    <div>Mật khẩu mới</div>
                    <Input
                        type="password"
                        value={data.newPassword}
                        onChange={e => setData({
                            ...data,
                            newPassword: e.target.value
                        })}
                        isValid={(data.newPassword != '' && error.newPassword) ? false : true}
                    />

                    {error.newPassword
                        && (
                            <ErrorMessage>{error.newPassword}</ErrorMessage>
                        )}
                </div>
            </div>

            <div>
                <div>
                    <div>Nhập lại mật khẩu</div>
                    <Input
                        type="password"
                        value={data.repeatNewPassword}
                        onChange={e => setData({
                            ...data,
                            repeatNewPassword: e.target.value
                        })}
                        isValid={(data.repeatNewPassword != '' && error.repeatNewPassword) ? false : true}
                    />

                    {error.repeatNewPassword
                        && (
                            <ErrorMessage>{error.repeatNewPassword}</ErrorMessage>
                        )}
                </div>
            </div>

            <div className="pt-2">
                <Button
                    disabled={!isValid || changePasswordStatus === PENDING}
                    onClick={() => setChangePasswordSubmit(true)}
                >
                    {changePasswordStatus === PENDING ? 'Đang đổi mật khẩu...' : 'Đổi mật khẩu'}
                </Button>
            </div>
        </div>
    )
}

export default ResetPasswordTabContent