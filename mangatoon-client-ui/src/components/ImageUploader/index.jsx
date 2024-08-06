import { memo, useEffect, useRef, useState } from "react"

function ImageUploader({
    src = '',
    onChange = file => {}
}) {
    const [file, setFile] = useState(null)
    const imgRef = useRef(null)

    useEffect(() => {
        if (file && imgRef.current) {
            imgRef.current.src = URL.createObjectURL(file)
        }

        if (onChange) {
            onChange(file)
        }
    }, [file])

    return (
        <div className="flex flex-col justify-center items-center">
            <div>
                <img
                    ref={imgRef}
                    className="rounded-[50%] w-40 h-40 object-cover object-center bg-[#E5E5E5] border-2"
                    src={src}
                    alt="Avatar"
                />
            </div>

            <div className="flex justify-center items-center mt-4">
                <label
                    className="px-4 py-1.5 bg-[#FF3860] text-white rounded-[6px] hover:opacity-80 hover:cursor-pointer"
                    htmlFor="image"
                >
                    Chọn ảnh
                </label>

                <input
                    id="image"
                    type="file"
                    onChange={e => setFile(e.target.files?.[0])}
                    hidden
                />
            </div>

            <div className="mt-2 text-center italic text-[0.8rem]">Ảnh không quá 10MB và có định dạng png, jpg, jpeg</div>
        </div>
    )
}

export default memo(ImageUploader)