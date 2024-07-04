import { useEffect, useRef, useState } from "react"
import api from "../../../../../../api"

function Image({
    chapterImage,
    alt
}) {
    const imgRef = useRef(null)

    useEffect(() => {
        async function getImage() {
            try {
                const response = await api.chapterImage.getImage(chapterImage)
                const imageBlob = response.data
                const imageUrl = URL.createObjectURL(imageBlob)
                imgRef.current.src = imageUrl
            } catch (error) {
                console.error('Error fetching image:', error);
            }
        }

        getImage()
    }, [])

    return (
        <div>
            <img
                ref={imgRef}
                alt={alt}
            />
        </div>
    )
}

export default Image