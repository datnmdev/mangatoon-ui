import { useEffect, useRef } from "react"
import api from "../../../../../../api"

function CoverImage({ data }) {
    const coverImageRef = useRef(null)

    useEffect(() => {
        async function getImage() {
            try {
                const response = await api.story.getImage({
                    url: data.coverImageUrl
                })
                const imageBlob = response.data
                const imageUrl = URL.createObjectURL(imageBlob)
                coverImageRef.current.src = imageUrl
            } catch (error) {
                console.error('Error fetching image:', error);
            }
        }

        if (!data.coverImageUrl.startsWith('https://storage.googleapis.com')) {
            getImage()
        }
    }, [])

    return (
        <img
            className="w-[64px] h-[82px] object-cover object-center"
            ref={coverImageRef}
            src={data.coverImageUrl}
            alt={data.title}
        />
    )
}

export default CoverImage