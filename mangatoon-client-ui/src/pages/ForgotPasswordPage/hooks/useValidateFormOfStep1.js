import { useEffect, useState } from "react"

function useValidateFormOfStep1(data) {
    const [isValid, setValid] = useState(false)
    const [error, setError] = useState({
        email: null
    })

    function validate() {
        if (data.email === '') {
            return false
        }

        if (error.email) {
            return false
        }

        return true
    }

    useEffect(() => {
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
    }, [data])

    useEffect(() => {
        setValid(validate())
    }, [error])

    return {
        error,
        isValid
    }
}

export default useValidateFormOfStep1