import { useEffect, useState } from "react"
import { FAILED, IDLE, PENDING, SUCCEEDED } from "../../../../../../../constants/fetchStatus.constant"
import api from "../../../../../../../api"

function useGetViewCountOfChapter(chapterId) {
    const [isSubmit, setSubmit] = useState(false)
    const [data, setData] = useState(undefined)
    const [status, setStatus] = useState(IDLE)

    useEffect(() => {
        async function submit() {
            try {
                setStatus(PENDING)
                const response = await api.viewDetail.getViewCountOfChapter(chapterId, {
                    from: new Date('1899-12-30T16:53:30.000Z'),
                    to: new Date()
                })
                setData(response.data)
                setStatus(SUCCEEDED)
            } catch (error) {
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

export default useGetViewCountOfChapter