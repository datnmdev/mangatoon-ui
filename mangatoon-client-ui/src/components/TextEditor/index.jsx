import { useEffect, useRef, useState } from "react"
import RoundButton from "../RoundButton"
import { IDLE, PENDING } from "../../constants/fetchStatus.constant"

function TextEditor({
    value = '',
    placeholder = 'Nội dung bình luận...',
    disabled = false,
    status = IDLE,
    onChange = value => { },
    onSubmit = () => { },
    reset = {
        value: false
    }
}) {
    const editorRef = useRef(null)
    const [content, setContent] = useState(value)
    const [hidden, setHidden] = useState(false)

    useEffect(() => {
        function handleInputEvent(e) {
            setContent(e.target.innerHTML)

            if (onChange) {
                onChange(e.target.innerHTML)
            }

            if (e.target.innerHTML === '') {
                setHidden(false)
            } else {
                setHidden(true)
            }
        }

        editorRef.current.addEventListener('input', handleInputEvent)

        return () => {
            removeEventListener('input', handleInputEvent)
        }
    }, [])

    useEffect(() => {
        if (reset.value) {
            editorRef.current.innerHTML = ''
            setHidden(false)
        }
    }, [reset])

    return (
        <div className="bg-[#EFF2F5] rounded-[12px] p-4">
            <div className="relative flex flex-col">
                <div
                    className="py-1 min-h-[32px] outline-none relative z-[1] whitespace-pre-wrap break-words grow-0"
                    ref={editorRef}
                    contentEditable={!disabled}
                    dangerouslySetInnerHTML={{
                        __html: value
                    }}
                />

                <div
                    className="py-1 absolute top-0 left-0 text-[#74777B]"
                    hidden={hidden}
                >
                    {placeholder}
                </div>
            </div>

            <div className="flex justify-between items-center mt-2">
                <div className="flex items-center">
                    <div>
                        <RoundButton
                            icon={(<i className="fa-regular fa-face-smile"></i>)}
                            color="#BDC3C9"
                            disabled={disabled}
                        />
                    </div>

                    <div>
                        <RoundButton
                            icon={(<i className="fa-solid fa-gift"></i>)}
                            color="#BDC3C9"
                            disabled={disabled}
                        />
                    </div>
                </div>

                <div>
                    {status === PENDING
                        ? (
                            <img
                                className="w-6"
                                src="/imgs/loading.gif"
                            />
                        )
                        : (
                            <RoundButton
                                icon={(<i className="fa-solid fa-paper-plane"></i>)}
                                color={content === '' ? '#BDC3C9' : '#005FCE'}
                                disabled={content === ''}
                                onClick={onSubmit}
                            />
                        )}
                </div>
            </div>
        </div>
    )
}

export default TextEditor