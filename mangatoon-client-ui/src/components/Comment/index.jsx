import { useEffect, useState } from "react"
import { Skeleton } from '@mui/material'
import Interaction from "./components/Interaction"
import Replies from "./components/Replies"
import useGetUserInfo from "./hooks/useGetUserInfo"
import { PENDING, SUCCEEDED } from "../../constants/fetchStatus.constant"
import TextEditorSection from "../TextEditorSection"

function Comment({
    book,
    chapter,
    data
}) {
    const [editor, setEditor] = useState(false)
    const { data: getUserInfoData, status: getUserInfoStatus, setSubmit: setGetUserInfoSubmit } = useGetUserInfo(data.userId)
    const [refetchReplies, setRefetchReplies] = useState({
        value: false
    })

    useEffect(() => {
        setGetUserInfoSubmit(true)
    }, [])

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
                <div className="bg-[#EFF2F5] px-3 py-2 rounded-[12px]">
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
                        
                    </div>

                    <div dangerouslySetInnerHTML={{ __html: data.content }}></div>
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
                    />
                </div>

                <div
                    className="mt-2"
                    hidden={!editor}
                >
                    <TextEditorSection
                        book={book}
                        chapter={chapter}
                        parentComment={data}
                        onSubmit={status => status === SUCCEEDED && setRefetchReplies({ value: true })}
                    />
                </div>
            </div>
        </div>
    )
}

export default Comment