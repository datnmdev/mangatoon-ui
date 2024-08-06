import { memo, useEffect, useState } from "react"
import { Skeleton } from '@mui/material'
import useGetCommentInteractionCount from "./hooks/useGetCommentInteractionCount"
import { PENDING, SUCCEEDED } from "../../../../constants/fetchStatus.constant"
import useGetCommentInteraction from "./hooks/useGetCommentInteraction"
import { useSelector } from "react-redux"
import { userSelectors } from "../../../../features/user.feature"
import { DISLIKE, LIKE } from "./constants"
import useCreateCommentInteraction from "./hooks/useCreateCommentInteraction"
import useUpdateCommentInteraction from "./hooks/useUpdateCommentInteraction"
import useDeleteCommentInteraction from "./hooks/useDeleteCommentInteraction"

function Interaction({
    comment
}) {
    const profile = useSelector(userSelectors.selectProfile)
    const { data: getCommentInteractionCountData, status: getCommentInteractionCountStatus, setSubmit: setGetCommentInteractionCountSubmit } = useGetCommentInteractionCount(comment.id)
    const { data: getCommentInteractionData, setSubmit: setGetCommentInteractionSubmit } = useGetCommentInteraction({
        userId: profile?.id,
        commentId: comment.id
    })
    const [createCommentInteractionSubmitData, setCreateCommentInteractionSubmitData] = useState({
        userId: profile?.id,
        commentId: comment.id
    })
    const { data: createCommentInteractionData, status: createCommentInteractionStatus, setSubmit: setCreateCommentInteractionSubmit } = useCreateCommentInteraction(createCommentInteractionSubmitData)
    const [updateCommentInteractionSubmitData, setUpdateCommentInteractionSubmitData] = useState({
        userId: profile?.id,
        commentId: comment.id
    })
    const { data: updateCommentInteractionData, status: updateCommentInteractionStatus, setSubmit: setUpdateCommentInteractionSubmit } = useUpdateCommentInteraction(updateCommentInteractionSubmitData)
    const { data: deleteCommentInteractionData, status: deleteCommentInteractionStatus, setSubmit: setDeleteCommentInteractionSubmit } = useDeleteCommentInteraction({
        commentId: comment.id
    })

    useEffect(() => {
        setGetCommentInteractionCountSubmit(true)
    }, [])

    useEffect(() => {
        if (profile) {
            setGetCommentInteractionSubmit(true)
        }
    }, [profile])

    useEffect(() => {
        if (!isNaN(createCommentInteractionSubmitData.interactionType)) {
            setCreateCommentInteractionSubmit(true)
        }
    }, [createCommentInteractionSubmitData])

    useEffect(() => {
        if (!isNaN(updateCommentInteractionSubmitData.interactionType)) {
            setUpdateCommentInteractionSubmit(true)
        }
    }, [updateCommentInteractionSubmitData])

    useEffect(() => {
        if (createCommentInteractionStatus === SUCCEEDED) {
            if (createCommentInteractionData.data) {
                setGetCommentInteractionSubmit(true)
                setGetCommentInteractionCountSubmit(true)
            }
        }
    }, [createCommentInteractionStatus])

    useEffect(() => {
        if (updateCommentInteractionStatus === SUCCEEDED) {
            if (updateCommentInteractionData.data) {
                setGetCommentInteractionSubmit(true)
                setGetCommentInteractionCountSubmit(true)
            }
        }
    }, [updateCommentInteractionStatus])

    useEffect(() => {
        if (deleteCommentInteractionStatus === SUCCEEDED) {
            if (deleteCommentInteractionData.data) {
                setGetCommentInteractionSubmit(true)
                setGetCommentInteractionCountSubmit(true)
            }
        }
    }, [deleteCommentInteractionStatus])

    return (
        <div className="flex items-center space-x-3">
            <div className="space-x-1 group">
                <span
                    className="group-hover:text-black cursor-pointer"
                    style={{
                        color: getCommentInteractionData?.data?.[0]?.interactionType === LIKE ? '#F08121' : '#4a454599'
                    }}
                    onClick={() => {
                        if (getCommentInteractionData?.data?.[0]) {
                            if (getCommentInteractionData.data[0].interactionType === LIKE) {
                                setDeleteCommentInteractionSubmit(true)
                            } else {
                                setUpdateCommentInteractionSubmitData({
                                    ...updateCommentInteractionSubmitData,
                                    interactionType: LIKE
                                })
                            }
                        } else {
                            setCreateCommentInteractionSubmitData({
                                ...createCommentInteractionSubmitData,
                                interactionType: LIKE
                            })
                        }
                    }}
                >
                    <i className="fa-solid fa-thumbs-up"></i>
                </span>

                {!getCommentInteractionCountData?.data || getCommentInteractionCountStatus === PENDING
                    ? (
                        <Skeleton>
                            <span className="select-none w-[48px]"> </span>
                        </Skeleton>
                    )
                    : (
                        <span className="select-none">
                            {getCommentInteractionCountData.data.likeCount}
                        </span>
                    )}
            </div>

            <div className="space-x-1 group">
                <span
                    className="group-hover:text-black cursor-pointer"
                    style={{
                        color: getCommentInteractionData?.data?.[0]?.interactionType === DISLIKE ? '#F08121' : '#4a454599'
                    }}
                    onClick={() => {
                        if (getCommentInteractionData?.data?.[0]) {
                            if (getCommentInteractionData.data[0].interactionType === DISLIKE) {
                                setDeleteCommentInteractionSubmit(true)
                            } else {
                                setUpdateCommentInteractionSubmitData({
                                    ...updateCommentInteractionSubmitData,
                                    interactionType: DISLIKE
                                })
                            }
                        } else {
                            setCreateCommentInteractionSubmitData({
                                ...createCommentInteractionSubmitData,
                                interactionType: DISLIKE
                            })
                        }
                    }}
                >
                    <i className="fa-solid fa-thumbs-down"></i>
                </span>

                {!getCommentInteractionCountData?.data || getCommentInteractionCountStatus === PENDING
                    ? (
                        <Skeleton>
                            <span className="select-none w-[48px]"> </span>
                        </Skeleton>
                    )
                    : (
                        <span className="select-none">
                            {getCommentInteractionCountData.data.dislikeCount}
                        </span>
                    )}
            </div>
        </div>
    )
}

export default memo(Interaction)