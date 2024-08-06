import { useSelector } from "react-redux"
import { userSelectors } from "../../features/user.feature"
import { memo, useEffect, useState } from "react"
import TextEditor from "../TextEditor"
import { PENDING } from "../../constants/fetchStatus.constant"
import Protected from "../Protected"

function TextEditorSection({
    value = '',
    status,
    onChange = (value) => {},
    onSubmit = () => {}
}) {
    const [content, setContent] = useState(value)
    const [enableProtection, setEnableProtection] = useState(false)
    const profile = useSelector(userSelectors.selectProfile)

    useEffect(() => {
        if (onChange) {
            onChange(content)
        }
    }, [content])

    useEffect(() => {
        setContent(value)
    }, [value])

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
                        value={content}
                        onChange={value => setContent(value)}
                        onSubmit={() => {
                            setEnableProtection(true)
                            if (onSubmit) {
                                onSubmit()
                            }
                        }}
                        status={status}
                        disabled={status === PENDING}
                    />
                </Protected>
            </div>
        </div>
    )
}

export default memo(TextEditorSection)