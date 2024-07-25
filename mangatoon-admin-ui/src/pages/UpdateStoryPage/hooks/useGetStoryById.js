import { useEffect, useState } from "react"
import { FAILED, IDLE, PENDING, SUCCEEDED } from "../../../constants/fetchStatus.constant"
import api from "../../../api"
import { FINISHED, IN_PROGRESS, SUSPENDED, UNPUBLISHED } from "../../StoryManagementPage/components/StoryList/constants"

function useGetStoryById(id) {
    const [isSubmit, setSubmit] = useState(false)
    const [data, setData] = useState(undefined)
    const [status, setStatus] = useState(IDLE)

    useEffect(() => {
        async function submit() {
            try {
                setStatus(PENDING)
                const response = await api.story.getStories({
                    id,
                    status: `${UNPUBLISHED},${IN_PROGRESS},${SUSPENDED},${FINISHED}`,
                    page: 1,
                    limit: 1
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

export default useGetStoryById