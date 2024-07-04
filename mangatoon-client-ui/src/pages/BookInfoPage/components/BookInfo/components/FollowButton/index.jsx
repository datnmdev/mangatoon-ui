import { useSelector } from 'react-redux'
import IconButton from "../../../../../../components/IconButton"
import useGetStoryFollowDetail from "./hooks/useGetStoryFollowDetail"
import { userSelectors } from '../../../../../../features/user.feature'
import useCreateStoryFollowDetail from './hooks/useCreateStoryFollowDetail'
import useDeleteStoryFollowDetail from './hooks/useDeleteStoryFollowDetail'
import { useEffect, useState } from 'react'
import { PENDING, SUCCEEDED } from '../../../../../../constants/fetchStatus.constant'
import SkeletonFollowButton from './SkeletonFollowButton'
import Protected from '../../../../../../components/Protected'

function FollowButton({
    book,
    setGetFollowCountSubmit
}) {
    const profile = useSelector(userSelectors.selectProfile)
    const { data: getStoryFollowDetailData, status: getStoryFollowDetailStatus, setSubmit: setGetStoryFollowDetailSubmit } = useGetStoryFollowDetail({
        storyId: book.id,
        userId: profile?.id ?? -1,
        page: 1,
        limit: 1
    })
    const { data: createStoryFollowDetailData, status: createStoryFollowDetailStatus, setSubmit: setCreateStoryFollowDetailSubmit } = useCreateStoryFollowDetail({
        storyId: book.id
    })
    const { data: deleteStoryFollowDetailData, status: deleteStoryFollowDetailStatus, setSubmit: setDeleteStoryFollowDetailSubmit } = useDeleteStoryFollowDetail({
        storyId: book.id
    })
    const [enableProtection, setEnableProtection] = useState(false)

    useEffect(() => {
        setGetStoryFollowDetailSubmit(true)
    }, [])

    useEffect(() => {
        if (createStoryFollowDetailStatus === SUCCEEDED) {
            if (createStoryFollowDetailData.data) {
                setGetStoryFollowDetailSubmit(true)
                setGetFollowCountSubmit(true)
            }
        }
    }, [createStoryFollowDetailStatus])

    useEffect(() => {
        if (deleteStoryFollowDetailStatus === SUCCEEDED) {
            if (deleteStoryFollowDetailData.data) {
                setGetStoryFollowDetailSubmit(true)
                setGetFollowCountSubmit(true)
            }
        }
    }, [deleteStoryFollowDetailStatus])


    if (!getStoryFollowDetailData?.data || getStoryFollowDetailStatus === PENDING) {
        return (
            <SkeletonFollowButton />
        )
    }

    if (createStoryFollowDetailStatus === PENDING || deleteStoryFollowDetailStatus === PENDING) {
        return (
            <IconButton
                disabled={true}
            >
                Đang xử lý...
            </IconButton>
        )
    }

    return (
        <Protected
            enable={enableProtection}
        >
            <IconButton
                icon={(<i className="fa-solid fa-heart"></i>)}
                backgroundColor='#ff3860'
                onClick={() => {
                    setEnableProtection(true)
                    if (!getStoryFollowDetailData.data.rows?.[0]) {
                        setCreateStoryFollowDetailSubmit(true)
                    } else {
                        setDeleteStoryFollowDetailSubmit(true)
                    }
                }}
            >
                {getStoryFollowDetailData.data.rows?.[0] ? 'Đang theo dõi' : 'Theo dõi'}
            </IconButton>
        </Protected>
    )
}

export default FollowButton