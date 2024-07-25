import { useEffect, useRef, useState } from "react"
import IconButton from "../IconButton"
import api from "../../api"

function CoverImageUploader({
    disabled = false,
    reset = {
        value: false
    },
    previewUrl,
    onChange
}) {
    const fileInputRef = useRef(null)
    const [file, setFile] = useState(null)
    const imgRef = useRef(null)

    useEffect(() => {
        if (onChange) {
            onChange(file)
        }
    }, [file])

    useEffect(() => {
        if (reset.value) {
            setFile(null)
        }
    }, [reset])

    useEffect(() => {
        async function getImage() {
            try {
                const response = await api.story.getImage({
                    url: previewUrl
                })
                const imageBlob = response.data
                const imageUrl = URL.createObjectURL(imageBlob)
                imgRef.current.src = imageUrl
            } catch (error) {
                console.error('Error fetching image:', error);
            }
        }

        if (previewUrl && !previewUrl.startsWith('https://storage.googleapis.com')) {
            getImage()
        }
    }, [previewUrl])

    return (
        <div
            className="relative group/parent rounded-[8px] overflow-hidden w-[216px] h-[295px] border-4"
            style={{
                boxShadow: file ? '8px 4px 1px black' : '8px 4px 1px #E8EBED',
                borderColor: file ? 'black' : '#E8EBED'
            }}
        >
            <div className="h-full">
                {file || previewUrl
                    ? (
                        <img
                            ref={imgRef}
                            className="w-full h-full object-cover object-center"
                            src={file ? URL.createObjectURL(file) : previewUrl}
                            alt="Cover Image"
                        />
                    )
                    : (
                        <div className="w-full h-full flex justify-center items-center">
                            <div>
                                <div className="text-[6rem] text-[#E8EBED]">
                                    <i className="fa-solid fa-image"></i>
                                </div>
                            </div>
                        </div>
                    )}
            </div>

            {!disabled
                && (
                    <div className="hidden absolute top-0 left-0 w-full h-full group-hover/parent:block animate-fadeIn">
                        <div>
                            <div className="absolute w-full h-full bg-[rgba(245,241,241,0.6)]"></div>
                            <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
                                <IconButton
                                    icon={(<i className="fa-solid fa-arrow-up-from-bracket"></i>)}
                                    content="Tải ảnh lên"
                                    sx={{
                                        minWidth: '120px'
                                    }}
                                    onClick={(e) => {
                                        e.preventDefault()
                                        fileInputRef.current.click()
                                    }}
                                />

                                <input
                                    ref={fileInputRef}
                                    accept="image/jpg,image/jpeg,image/png"
                                    type="file"
                                    id="image-upload"
                                    className="hidden"
                                    onChange={e => setFile(e.target.files[0])}
                                />
                            </div>
                        </div>
                    </div>
                )}
        </div>
    )
}

export default CoverImageUploader