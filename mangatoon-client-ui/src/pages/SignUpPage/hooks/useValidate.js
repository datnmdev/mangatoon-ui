import { useEffect, useState } from "react"
import api from "../../../api"

function useValidate(data) {
    const [isValid, setValid] = useState(false)
    const [error, setError] = useState({
        email: null,
        password: null,
        repeatPassword: null
    })

    function validate() {
        if (data.email === '' || data.password === '' || data.repeatPassword === '') {
            return false
        }

        if (error.email || error.password || error.repeatPassword) {
            return false
        }

        return true
    }

    useEffect(() => {
        async function checkEmail() {
            try {
                const checkEmail = (await api.user.checkEmail({
                    email: data.email
                })).data.data
                
                if (checkEmail) {
                    setError({
                        ...error,
                        email: 'Địa chỉ email đã tồn tại'
                    })
                }
            } catch (error) {
                
            }
        }

        if (data.email != '' && !(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/).test(data.email)) {
            setError(prev => ({
                ...prev,
                email: 'Địa chỉ email không hợp lệ'
            }))
        } else {
            setError(prev => ({
                ...prev,
                email: null
            }))
        }

        checkEmail()
    }, [data.email])

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
    }, [data.password, data.repeatPassword])

    useEffect(() => {
        setValid(validate())
    }, [error])

    return {
        error,
        isValid
    }
}

export default useValidate