import { useEffect, useRef, useState } from "react"

function UploaderButton({
    multiple = true,
    accept = '.jpg, .jpeg, .png',
    backgroundColor = 'rgb(65, 192, 53)',
    color = 'white',
    children,
    reset = {
        value: false
    },
    onChange = (files) => { }
}) {
    const [files, setFiles] = useState(undefined)
    const inputRef = useRef(null)

    useEffect(() => {
        if (onChange) {
            onChange(files)
        }
    }, [files])

    useEffect(() => {
        if (reset.value) {
            inputRef.current.value = ''
        }
    }, [reset])

    return (
        <label
            htmlFor="uploader-button"
            className="flex justify-center items-center space-x-2 px-4 py-1 rounded-[8px] hover:opacity-80 cursor-pointer font-[350]"
            style={{
                backgroundColor,
                color
            }}
        >
            {children}
            <input
                ref={inputRef}
                className="hidden"
                type="file"
                id="uploader-button"
                multiple={multiple}
                accept={accept}
                onChange={e => setFiles(e.target.files)}
            />
        </label>
    )
}

export default UploaderButton