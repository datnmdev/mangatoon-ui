import { useEffect, useState } from "react"
import { FAILED, IDLE, PENDING, SUCCEEDED } from "../../../../../constants/fetchStatus.constant"
import api from "../../../../../api"

function useUpdateProfile(body) {
    const [isSubmit, setSubmit] = useState(false)
    const [data, setData] = useState(undefined)
    const [status, setStatus] = useState(IDLE)

    useEffect(() => {
        async function submit() {
            try {
                setStatus(PENDING)
                const data = new FormData()
                for (let key of Object.keys(body)) {
                    if (body[key] !== undefined && body[key] !== null) {
                        data.append(key, body[key])
                    }
                }   
                const response = await api.user.updateProfile(data)
                setData(response.data)
                setStatus(SUCCEEDED)
            } catch (error) {
                console.log(error);
                setStatus(FAILED)
            }
        }

        if (isSubmit) {
            submit()
        }
    }, [isSubmit])

    useEffect(() => {
        if (status === SUCCEEDED || status === FAILED) {
            setSubmit(false)
        }
    }, [status])

    return {
        data,
        status,
        setSubmit
    }
}

export default useUpdateProfile