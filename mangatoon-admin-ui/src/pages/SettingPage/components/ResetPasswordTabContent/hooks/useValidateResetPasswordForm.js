import { useEffect, useState } from "react"

function useValidateResetPasswordForm(data) {
    const [isValid, setValid] = useState(false)
    const [error, setError] = useState({
        oldPassword: null,
        newPassword: null,
        repeatNewPassword: null
    })

    function validate() {
        if (data.oldPassword === '' || data.newPassword === '' || data.repeatNewPassword === '') {
            return false
        }

        if (error.oldPassword || error.newPassword || error.repeatNewPassword) {
            return false
        }

        return true
    }

    useEffect(() => {
        if (data.newPassword != '' && !(/^(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])(?=.*\S).{8,}$/).test(data.newPassword)) {
            setError(prev => ({
                ...prev,
                newPassword: 'Mật khẩu phải ít nhất 8 kí tự bao gồm tối thiểu một kí tự in hoa, số và kí tự đăc biệt'
            }))
        } else {
            setError(prev => ({
                ...prev,
                newPassword: null
            }))
        }

        if (data.repeatNewPassword !== data.newPassword) {
            setError(prev => ({
                ...prev,
                repeatNewPassword: 'Mật khẩu không khớp'
            }))
        } else {
            setError(prev => ({
                ...prev,
                repeatNewPassword: null
            }))
        }
    }, [data.newPassword, data.repeatNewPassword])

    useEffect(() => {
        setValid(validate())
    }, [error, data.oldPassword])

    return {
        error,
        isValid
    }
}

export default useValidateResetPasswordForm