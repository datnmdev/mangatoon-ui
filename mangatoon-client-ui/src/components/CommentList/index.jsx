import { memo, useEffect, useState } from "react"
import Comment from "../Comment"
import useGetComments from "../../pages/ChapterContentPage/components/CommentSection/hooks/useGetComments"
import { PENDING } from "../../constants/fetchStatus.constant"
import { Pagination } from "@mui/material"
import { DESC } from "./constants"

function CommentList({
    book,
    chapter,
    parentComment,
    hidePagination = false,
    limit = 12,
    sort = DESC,
    refetch = {
        value: false
    },
    setRefetch
}) {
    const [pagination, setPagination] = useState({
        page: 1,
        limit
    })
    const [_sort, setSort] = useState(sort)
    const { data: getCommentsData, status: getCommentStatus, setSubmit: setGetCommentSubmit } = useGetComments({
        ...pagination,
        chapterId: chapter?.id,
        sort: _sort,
        storyId: book?.id,
        parentId: parentComment?.id
    })

    useEffect(() => {
        setGetCommentSubmit(true)
    }, [pagination])

    useEffect(() => {
        if (refetch.value) {
            setGetCommentSubmit(true)
        }
    }, [refetch])

    if (!getCommentsData?.data || getCommentStatus === PENDING) {
        return (
            <div>
                Loading...
            </div>
        )
    }

    return (
        <div className="space-y-2">
            <div className="space-y-4">
                {getCommentsData.data.rows.map(comment => {
                    return (
                        <Comment
                            key={comment.id}
                            book={book}
                            chapter={chapter}
                            data={comment}
                            setRefetchCommentList={setRefetch}
                        />
                    )
                })}
            </div>

            <div className="flex justify-center">
                {getCommentsData.data.rows.length > 0 && !hidePagination
                    ? (
                        <Pagination
                            size="large"
                            count={Math.ceil(getCommentsData.data.count / pagination.limit)}
                            page={pagination.page}
                            onChange={(e, page) => setPagination({
                                ...pagination,
                                page
                            })}
                        />
                    )
                    : null}
            </div>
        </div>
    )
}

export default memo(CommentList)