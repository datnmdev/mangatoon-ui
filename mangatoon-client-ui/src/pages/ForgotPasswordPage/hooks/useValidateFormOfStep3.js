import { useEffect, useState } from "react"

function useValidateFormOfStep3(data) {
    const [isValid, setValid] = useState(false)
    const [error, setError] = useState({
        password: null,
        repeatPassword: null
    })

    function validate() {
        if (data.password === '' || data.repeatPassword === '') {
            return false
        }

        if (error.password || error.repeatPassword) {
            return false
        }

        return true
    }

    useEffect(() => {
        if (data.password != '' && !(/^(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])(?=.*\S).{8,}$/).test(data.password)) {
            setError(prev => ({
                ...prev,
                password: 'Mật khẩu phải ít nhất 8 kí tự bao gồm tối thiểu một kí tự in hoa, số và kí tự đăc biệt'
            }))
        } else {
            setError(prev => ({
                ...prev,
                password: null
            }))
        }

        if (data.repeatPassword !== data.password) {
            setError(prev => ({
                ...prev,
                repeatPassword: 'Mật khẩu không khớp'
            }))
        } else {
            setError(prev => ({
                ...prev,
                repeatPassword: null
            }))
        }
    }, [data])

    useEffect(() => {
        setValid(validate())
    }, [error])

    return {
        error,
        isValid
    }
}

export default useValidateFormOfStep3