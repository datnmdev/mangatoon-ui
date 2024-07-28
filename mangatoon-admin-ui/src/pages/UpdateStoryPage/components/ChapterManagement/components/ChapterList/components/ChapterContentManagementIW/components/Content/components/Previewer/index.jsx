import { useEffect, useRef } from "react"
import api from "../../../../../../../../../../../../api"

function Previewer({
    chapterImageData
}) {
    const imgRef = useRef(null)

    useEffect(() => {
        async function getImage() {
            try {
                const response = await api.story.getImage({
                    url: chapterImageData.path
                })
                const imageBlob = response.data
                const imageUrl = URL.createObjectURL(imageBlob)
                imgRef.current.src = imageUrl
            } catch (error) {
                console.error('Error fetching image:', error);
            }
        }

        if (!chapterImageData.path.startsWith('https://storage.googleapis.com')) {
            getImage()
        }
    }, [chapterImageData])

    return (
        <div>
            <img
                className="block w-full"
                ref={imgRef}
                src={chapterImageData.path}
                alt={`Ảnh ${chapterImageData.order}`}
            />
        </div>
    )
}

export default Previewer