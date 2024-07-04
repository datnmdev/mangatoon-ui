import { useEffect, useState } from "react"
import { FAILED, IDLE, PENDING, SUCCEEDED } from "../../../../../../../constants/fetchStatus.constant"
import { useDispatch, useSelector } from "react-redux"
import { userAsyncThunks, userSelectors } from "../../../../../../../features/user.feature"

function useGetProfile() {
    const dispatch = useDispatch()
    const profile = useSelector(userSelectors.selectProfile)
    const [isSubmit, setSubmit] = useState(false)
    const [data, setData] = useState(undefined)
    const [status, setStatus] = useState(IDLE)

    useEffect(() => {
        async function submit() {
            try {
                setStatus(PENDING)
                await dispatch(userAsyncThunks.getProfile()).unwrap()
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

    useEffect(() => {
        setData(profile)
    }, [profile])

    return {
        data,
        status,
        setSubmit
    }
}

export default useGetProfile