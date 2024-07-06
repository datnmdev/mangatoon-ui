import { useSelector } from "react-redux"
import { userSelectors } from "../../features/user.feature"
import { useEffect, useState } from "react"
import TextEditor from "../TextEditor"
import useCreateComment from "./hooks/useCreateComment"
import { PENDING, SUCCEEDED } from "../../constants/fetchStatus.constant"
import Protected from "../Protected"

function TextEditorSection({
    book,
    chapter,
    parentComment,
    onSubmit = (status) => { }
}) {
    const profile = useSelector(userSelectors.selectProfile)
    const [content, setContent] = useState('')
    const [submitData, setSubmitData] = useState({
        chapterId: chapter?.id,
        storyId: book?.id,
        content,
        parentId: parentComment?.id
    })
    const { data: createCommentData, status: createCommentStatus, setSubmit: setCreateCommentSubmit } = useCreateComment(submitData)
    const [enableProtection, setEnableProtection] = useState(false)

    useEffect(() => {
        setSubmitData({
            ...submitData,
            content
        })
    }, [content])

    useEffect(() => {
        if (onSubmit) {
            onSubmit(createCommentStatus)
        }

        if (createCommentStatus === SUCCEEDED) {
            if (createCommentData.data) {
                setContent('')
            }
        }
    }, [createCommentStatus])

    return (
        <div className='flex justify-between items-start space-x-2'>
            <div className='shrink-0'>
                <img
                    className="w-14 h-14 object-cover object-center rounded-[50%] border-[2px]"
                    src={profile?.avatarUrl ?? '/imgs/user-default.jpg'}
                    alt="Avatar"
                />
            </div>

            <div className='grow'>
                <Protected enable={enableProtection}>
                    <TextEditor
                        onChange={value => setContent(value)}
                        onSubmit={() => {
                            setEnableProtection(true)
                            setCreateCommentSubmit(true)
                        }}
                        status={createCommentStatus}
                        disabled={createCommentStatus === PENDING}
                        reset={content === '' ? { value: true } : { value: false }}
                    />
                </Protected>
            </div>
        </div>
    )
}

export default TextEditorSection