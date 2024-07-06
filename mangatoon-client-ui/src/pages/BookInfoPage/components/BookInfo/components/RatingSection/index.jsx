import { Rating } from "@mui/material"
import Protected from "../../../../../../components/Protected"
import { useEffect, useRef, useState } from "react"
import useGetStoryRatingDetail from "./hooks/useGetStoryRatingDetail"
import { useSelector } from "react-redux"
import { userSelectors } from "../../../../../../features/user.feature"
import { PENDING, SUCCEEDED } from "../../../../../../constants/fetchStatus.constant"
import SkeletonRatingSection from "./SkeletonRatingSection"
import useCreateStoryRatingDetail from "./hooks/useCreateStoryRatingDetail"
import useUpdateStoryRatingDetail from "./hooks/useUpdateStoryRatingDetail"

function RatingSection({
    book,
    setRatingInfoOfStorySubmit
}) {
    const [enableProtection, setEnableProtection] = useState(false)
    const profile = useSelector(userSelectors.selectProfile)
    const [data, setData] = useState({
        storyId: book.id
    })
    const { data: getStoryRatingDetailData, status: getStoryRatingDetailStatus, setSubmit: setGetStoryRatingDetailSubmit } = useGetStoryRatingDetail({
        userId: profile?.id ?? -1,
        storyId: book.id
    })
    const { data: createStoryRatingDetailData, status: createStoryRatingDetailStatus, setSubmit: setCreateStoryRatingDetailSubmit } = useCreateStoryRatingDetail(data)
    const { data: updateStoryRatingDetailData, status: updateStoryRatingDetailStatus, setSubmit: setUpdateStoryRatingDetailSubmit } = useUpdateStoryRatingDetail(data)

    useEffect(() => {
        if (getStoryRatingDetailStatus === SUCCEEDED) {
            if (getStoryRatingDetailData.data.rows?.[0]) {
                setUpdateStoryRatingDetailSubmit(true)
            } else {
                setCreateStoryRatingDetailSubmit(true)
            }
        }
    }, [data])

    useEffect(() => {
        if (getStoryRatingDetailStatus === SUCCEEDED) {
            setRatingInfoOfStorySubmit(true)
        }
    }, [getStoryRatingDetailStatus])

    useEffect(() => {
        setGetStoryRatingDetailSubmit(true)
    }, [profile])

    useEffect(() => {
        if (createStoryRatingDetailStatus === SUCCEEDED) {
            if (createStoryRatingDetailData.data) {
                setGetStoryRatingDetailSubmit(true)
            }
        }
    }, [createStoryRatingDetailStatus])

    useEffect(() => {
        if (updateStoryRatingDetailStatus === SUCCEEDED) {
            if (updateStoryRatingDetailData.data) {
                setGetStoryRatingDetailSubmit(true)
            }
        }
    }, [updateStoryRatingDetailStatus])

    if (getStoryRatingDetailStatus === PENDING) {
        return (
            <SkeletonRatingSection />
        )
    }

    return (
        <Protected enable={enableProtection}>
            <div className='md:flex md:items-center md:space-x-2 xl:flex xl:items-center xl:space-x-2'>
                <Rating
                    value={getStoryRatingDetailData?.data?.rows?.[0]?.star}
                    size="large"
                    onChange={(e, value) => {
                        setEnableProtection(true)
                        setData({
                            ...data,
                            star: value
                        })
                    }}
                />

                <span className="sm:block">
                    {getStoryRatingDetailData?.data?.rows?.[0] ? `(Bạn đã đánh giá ${getStoryRatingDetailData.data.rows[0].star} sao)` : '(Bạn chưa đánh giá)'}
                </span>

            </div>
        </Protected>
    )
}

export default RatingSection