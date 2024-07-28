import { useEffect, useRef } from "react"
import api from "../../../../../../../../../../../../api"

function Item({
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
    }, [])

    return (
        <div>
            <div>
                <img
                    className="w-[64px] h-[64px] object-cover object-center"
                    ref={imgRef}
                    src={chapterImageData.path}
                    alt={`Ảnh ${chapterImageData.order}`}
                />
            </div>

            <div className="text-center">{chapterImageData.order}</div>
        </div>
    )
}

export default Item