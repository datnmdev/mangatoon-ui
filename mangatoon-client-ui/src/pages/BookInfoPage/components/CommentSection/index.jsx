import { useEffect, useState } from "react"
import CommentList from "../../../../components/CommentList"
import TextEditorSection from "../../../../components/TextEditorSection"
import Topic from "../../../../components/Topic"
import { SUCCEEDED } from "../../../../constants/fetchStatus.constant"
import useGetComments from "./hooks/useGetComments"
import { DESC } from "../../../../components/CommentList/constants"
import useCreateComment from "./hooks/useCreateComment"

function CommentSection({
    book,
    chapter
}) {
    const [refetch, setRefetch] = useState({
        value: 0
    })
    const { data: getCommentsData, status: getCommentsStatus, setSubmit: setGetCommentsSubmit } = useGetComments({
        page: 1,
        limit: 1,
        chapterId: chapter?.id,
        storyId: book?.id,
        sort: DESC
    })
    const [commentBody, setCommentBody] = useState({
        storyId: book?.id,
        chapterId: chapter?.id,
        content:''
    })
    const { data: createdCommentData, status: createCommentStatus, setSubmit: setCreateCommentSubmit } = useCreateComment(commentBody)

    useEffect(() => {
        setGetCommentsSubmit(true)
    }, [])

    useEffect(() => {
        if (refetch.value) {
            setGetCommentsSubmit(true)
        }
    }, [refetch])

    useEffect(() => {
        if (createCommentStatus === SUCCEEDED) {
            if (createdCommentData.data) {
                setCommentBody({
                    ...commentBody,
                    content: ''
                })
                setRefetch({
                    value: true
                })
            }
        }
    }, [createCommentStatus])

    return (
        <Topic
            name={(
                <div className="space-x-2 font-[450] text-[#F08121]">
                    <span>
                        <i className="fa-regular fa-comments"></i>
                    </span>

                    <span className="space-x-2">
                        <span>Bình Luận</span>
                        <span>({getCommentsData?.data && getCommentsData.data.count})</span>
                    </span>
                </div>
            )}
        >
            <div className="mb-4">
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

            <CommentList
                book={book}
                chapter={chapter}
                refetch={refetch}
                setRefetch={setRefetch}
            />
        </Topic>
    )
}

export default CommentSection