import { memo, useEffect, useState } from "react"
import CommentList from "../../../CommentList"
import useGetComments from "./hooks/useGetComments"
import { PENDING, SUCCEEDED } from "../../../../constants/fetchStatus.constant"
import { ASC } from "../../../CommentList/constants"

function Replies({
    book,
    chapter,
    parentData,
    refetch,
    setRefetch
}) {
    const [hidden, setHidden] = useState(true)
    const { data: getCommentsData, status: getCommentStatus, setSubmit: setGetCommentSubmit } = useGetComments({
        page: 1,
        limit: 1,
        chapterId: chapter?.id,
        storyId: book?.id,
        parentId: parentData?.id ?? -1,
        sort: ASC
    })

    useEffect(() => {
        setGetCommentSubmit(true)
    }, [])

    useEffect(() => {
        if (refetch.value) {
            setHidden(false)
        }
    }, [refetch])

    if (getCommentStatus === PENDING || !getCommentsData?.data) {
        return (
            <div>Loading...</div>
        )
    }

    if (getCommentStatus === SUCCEEDED) {
        if (getCommentsData.data) {
            if (getCommentsData.data.count === 0) {
                return (
                    <div>
                        {!hidden
                            && (
                                <div className="mt-4">
                                    <CommentList
                                        book={book}
                                        chapter={chapter}
                                        parentComment={parentData}
                                        limit={Number.MAX_SAFE_INTEGER}
                                        hidePagination={true}
                                        refetch={refetch}
                                        setRefetch={setRefetch}
                                    />
                                </div>
                            )}
                    </div>
                )
            }
        } else {
            return (
                <div>
                    {!hidden
                        && (
                            <div className="mt-4">
                                <CommentList
                                    book={book}
                                    chapter={chapter}
                                    parentComment={parentData}
                                    limit={Number.MAX_SAFE_INTEGER}
                                    hidePagination={true}
                                    refetch={refetch}
                                />
                            </div>
                        )}
                </div>
            )
        }
    }

    return (
        <div>
            {hidden
                && (
                    <span
                        className="space-x-1.5 cursor-pointer text-[#4a454599] hover:text-black hover:underline"
                        onClick={() => setHidden(false)}
                    >
                        <span>
                            <i className="fa-solid fa-reply"></i>
                        </span>

                        <span>Xem {getCommentsData.data.count} phản hồi</span>
                    </span>
                )}

            {!hidden
                && (
                    <div className="mt-4">
                        <CommentList
                            book={book}
                            chapter={chapter}
                            parentComment={parentData}
                            limit={Number.MAX_SAFE_INTEGER}
                            hidePagination={true}
                            refetch={refetch}
                            setRefetch={setRefetch}
                            sort={ASC}
                        />
                    </div>
                )}
        </div>
    )
}

export default memo(Replies)