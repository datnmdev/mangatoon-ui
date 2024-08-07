import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { userSelectors } from '../../../../../../features/user.feature'
import useGetStoryFollowDetail from './hooks/useGetStoryFollowDetail'
import useCreateStoryFollowDetail from './hooks/useCreateStoryFollowDetail'
import useDeleteStoryFollowDetail from './hooks/useDeleteStoryFollowDetail'
import { PENDING, SUCCEEDED } from '../../../../../../constants/fetchStatus.constant'
import SkeletonFollowButton from './SkeletonFollowButton'
import IconButton from '../../../../../../components/IconButton'
import Protected from '../../../../../../components/Protected'
import RoundButton from '../../../../../../components/RoundButton'

function FollowButton({
    book
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
            }
        }
    }, [createStoryFollowDetailStatus])

    useEffect(() => {
        if (deleteStoryFollowDetailStatus === SUCCEEDED) {
            if (deleteStoryFollowDetailData.data) {
                setGetStoryFollowDetailSubmit(true)
            }
        }
    }, [deleteStoryFollowDetailStatus])

    return (
        <Protected
            enable={enableProtection}
        >
            <IconButton
                icon={getStoryFollowDetailData?.data.rows?.[0] ? (<i className="fa-solid fa-heart"></i>) : <i className="fa-regular fa-heart"></i>}
                backgroundColor='white'
                color="black"
                sx={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 0
                }}
                onClick={() => {
                    setEnableProtection(true)
                    if (!getStoryFollowDetailData?.data.rows?.[0]) {
                        setCreateStoryFollowDetailSubmit(true)
                    } else {
                        setDeleteStoryFollowDetailSubmit(true)
                    }
                }}
            >

            </IconButton>
        </Protected>
    )
}

export default FollowButton