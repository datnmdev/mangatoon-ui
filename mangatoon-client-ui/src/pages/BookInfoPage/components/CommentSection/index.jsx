import { useEffect, useState } from "react"
import CommentList from "../../../../components/CommentList"
import TextEditorSection from "../../../../components/TextEditorSection"
import Topic from "../../../../components/Topic"
import { SUCCEEDED } from "../../../../constants/fetchStatus.constant"
import useGetComments from "./hooks/useGetComments"
import { DESC } from "../../../../components/CommentList/constants"

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

    useEffect(() => {
        setGetCommentsSubmit(true)
    }, [])

    useEffect(() => {
        if (refetch.value) {
            setGetCommentsSubmit(true)
        }
    }, [refetch])

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
                    book={book}
                    chapter={chapter}
                    onSubmit={(status) => status === SUCCEEDED && setRefetch({ value: 1 })}
               />
            </div>

            <CommentList
                book={book}
                chapter={chapter}
                refetch={refetch}
            />
        </Topic>
    )
}

export default CommentSection