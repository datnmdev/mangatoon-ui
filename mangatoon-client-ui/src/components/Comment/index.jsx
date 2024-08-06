import { memo, useEffect, useRef, useState } from "react"
import { Skeleton } from '@mui/material'
import Interaction from "./components/Interaction"
import Replies from "./components/Replies"
import useGetUserInfo from "./hooks/useGetUserInfo"
import { PENDING, SUCCEEDED } from "../../constants/fetchStatus.constant"
import TextEditorSection from "../TextEditorSection"
import RoundButton from "../RoundButton"
import useUpdateComment from "./hooks/useUpdateComment"
import { DELETED } from "./constants"
import { useSelector } from "react-redux"
import { userSelectors } from "../../features/user.feature"
import useCreateComment from "./hooks/useCreateComment"
import { timeAgo } from "../../helpers/timer"
import moment from "moment"

function Comment({
    book,
    chapter,
    data,
    setRefetchCommentList
}) {
    const [editor, setEditor] = useState(false)
    const profile = useSelector(userSelectors.selectProfile)
    const { data: getUserInfoData, status: getUserInfoStatus, setSubmit: setGetUserInfoSubmit } = useGetUserInfo(data.userId)
    const [refetchReplies, setRefetchReplies] = useState({
        value: false
    })
    const [hiddenOptions, setHiddenOptions] = useState(true)
    const optionsRef = useRef(null)
    const [updatingData, setUpdatingData] = useState({
        ...data
    })
    const { data: updatedCommentData, status: updatingCommentStatus, setSubmit: setUpdatingCommentSubmit } = useUpdateComment(updatingData)
    const [updating, setUpdating] = useState(false)
    const [commentBody, setCommentBody] = useState({
        storyId: book?.id,
        chapterId: chapter?.id,
        parentId: data.id,
        content: ''
    })
    const { data: createdCommentData, status: createCommentStatus, setSubmit: setCreateCommentSubmit } = useCreateComment(commentBody)

    useEffect(() => {
        setGetUserInfoSubmit(true)
    }, [])

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (optionsRef.current && !optionsRef.current.contains(event.target)) {
                setHiddenOptions(true)
            }
        }

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [])

    useEffect(() => {
        if (updatingData?.status === DELETED) {
            setUpdatingCommentSubmit(true)
        }
    }, [updatingData])

    useEffect(() => {
        if (updatingCommentStatus === SUCCEEDED) {
            if (updatedCommentData.data) {
                setRefetchCommentList({
                    value: true
                })
            }
        }
    }, [updatingCommentStatus])

    useEffect(() => {
        if (createCommentStatus === SUCCEEDED) {
            if (createdCommentData.data) {
                setCommentBody({
                    ...commentBody,
                    content: ''
                })
                setRefetchReplies({
                    value: true
                })
            }
        }
    }, [createCommentStatus])

    if (updating) {
        return (
            <div>
                <div>
                    <TextEditorSection
                        value={updatingData.content}
                        onChange={value => setUpdatingData({
                            ...updatingData,
                            content: value
                        })}
                        status={updatingCommentStatus}
                        onSubmit={() => setUpdatingCommentSubmit(true)}
                    />
                </div>

                <div className="flex justify-end">
                    <span
                        className="font-bold text-[blue] px-2 py-1 cursor-pointer hover:opacity-60"
                        onClick={() => {
                            setHiddenOptions(true)
                            setUpdating(false)
                        }}
                    >
                        Huỷ
                    </span>
                </div>
            </div>
        )
    }

    return (
        <div className="flex items-start space-x-2">
            <div className="shrink-0">
                {!getUserInfoData?.data || getUserInfoStatus === PENDING
                    ? (
                        <Skeleton
                            variant="circular"
                            animation="wave"
                        >
                            <span
                                className="w-14 h-14 border-[2px]"
                            />
                        </Skeleton>
                    )
                    : (
                        <img
                            className="w-14 h-14 object-cover object-center rounded-[50%] border-[2px]"
                            src={getUserInfoData.data.avatarUrl}
                            alt="Avatar"
                        />
                    )}
            </div>

            <div className="grow">
                <div className="bg-[#EFF2F5] px-3 py-2 rounded-[12px] flex justify-between items-center">
                    <div className="grow">
                        <div >
                            {!getUserInfoData?.data || getUserInfoStatus === PENDING
                                ? (
                                    <Skeleton
                                        variant="circular"
                                        animation="wave"
                                    >
                                        <span className="font-[450] w-[160px]"> </span>
                                    </Skeleton>
                                )
                                : (
                                    <span className="font-[450]">{getUserInfoData.data.name}</span>
                                )}

                            <span className="ml-2 text-[0.8rem] bg-[#BDC3C8] rounded-[4px] px-1 py-0.5 space-x-1">
                                <span>
                                    <i className="fa-regular fa-clock"></i>
                                </span>

                                <span>{timeAgo(data.updatedAt)}{new Date(data.createdAt).getTime() != new Date(data.updatedAt).getTime() ? ' (Đã chỉnh sửa)' : ''}</span>
                            </span>

                        </div>

                        <div className="whitespace-pre-line break-all" dangerouslySetInnerHTML={{ __html: data.content }}></div>
                    </div>

                    {profile?.id === data.userId
                        && (
                            <div className="relative">
                                <RoundButton
                                    icon={(<i className="fa-solid fa-ellipsis"></i>)}
                                    color="#000"
                                    size="2rem"
                                    onClick={() => setHiddenOptions(!hiddenOptions)}
                                />

                                {!hiddenOptions
                                    && (
                                        <ul
                                            ref={optionsRef}
                                            className="absolute right-0 top-full bg-white min-w-[120px] rounded-[6px] p-2 shadow-[0_0_8px_#ccc]"
                                        >
                                            <li
                                                onClick={() => setUpdating(true)}
                                                className="px-2 py-1 hover:bg-[#cccccc4d] cursor-pointer"
                                            >
                                                Sửa
                                            </li>

                                            <li
                                                className="px-2 py-1 hover:bg-[#cccccc4d] cursor-pointer"
                                                onClick={() => setUpdatingData({
                                                    ...data,
                                                    status: DELETED
                                                })}
                                            >
                                                Xoá
                                            </li>
                                        </ul>
                                    )}
                            </div>
                        )}
                </div>

                <div className="mt-1.5 flex items-center space-x-3 text-[#4a454599]">
                    <Interaction
                        comment={data}
                    />

                    <span
                        onClick={() => setEditor(true)}
                        className="cursor-pointer font-[450] hover:text-black select-none"
                    >
                        Phản hồi
                    </span>
                </div>

                <div className="mt-1">
                    <Replies
                        book={book}
                        chapter={chapter}
                        parentData={data}
                        refetch={refetchReplies}
                        setRefetch={setRefetchReplies}
                    />
                </div>

                <div
                    className="mt-2"
                    hidden={!editor}
                >
                    <TextEditorSection
                        value={commentBody.content}
                        onChange={(value) => setCommentBody({
                            ...commentBody,
                            content: value
                        })}
                        status={createCommentStatus}
                        onSubmit={() => setCreateCommentSubmit(true)}
                    />
                </div>
            </div>
        </div>
    )
}

export default memo(Comment)