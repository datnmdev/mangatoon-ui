import { useEffect, useState } from "react"
import { FAILED, IDLE, PENDING, SUCCEEDED } from "../../../../../constants/fetchStatus.constant"
import api from "../../../../../api"

function useSearchChapter(queries) {
    const [isSubmit, setSubmit] = useState(false)
    const [data, setData] = useState(undefined)
    const [status, setStatus] = useState(IDLE)

    useEffect(() => {
        async function submit() {
            try {
                setStatus(PENDING)
                const response = await api.chapter.search(queries)
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

export default useSearchChapter