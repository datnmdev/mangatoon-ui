import { memo, useEffect } from "react"
import useGetViewCountOfChapter from "./hooks/useGetViewCountOfChapter"
import { PENDING } from "../../../../../../constants/fetchStatus.constant"
import { Skeleton } from '@mui/material'

function View({
    chapterId
}) {
    const {data, status, setSubmit} = useGetViewCountOfChapter(chapterId)

    useEffect(() => {
        setSubmit(true)
    }, [])

    if (status === PENDING || !data?.data) {
        return (
            <Skeleton 
                variant="rounded"
                animation="wave"
            >
                <div className="w-[120px] h-[24px]"></div>
            </Skeleton>
        )
    }

    return (
        <div className="space-x-2">
            <span>
                <i className="fa-regular fa-eye"></i>
            </span>

            <span>{data.data.viewCount} lượt xem</span>
        </div>
    )
}

export default memo(View)