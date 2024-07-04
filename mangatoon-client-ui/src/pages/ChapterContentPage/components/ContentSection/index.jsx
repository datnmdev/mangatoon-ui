import { useEffect, useState } from "react"
import api from "../../../../api"
import Image from "./components/Image"

function ContentSection({ book, chapter }) {
    const [chapterImages, setChapterImages] = useState(null)

    useEffect(() => {
        async function getChapterImages() {
            try {
                const chapterImages = (await api.chapterImage.getChapterImages({
                    chapterId: chapter.id
                })).data.data
                setChapterImages(chapterImages)
            } catch (error) {

            }
        }

        getChapterImages()
    }, [])

    return (
        <div className="flex flex-col items-center text-white">
            {chapterImages !== null
                ? (
                    chapterImages.map(chapterImage => {
                        return (
                            <Image
                                key={chapterImage.id}
                                chapterImage={chapterImage}
                                alt={`${book.title} - ${chapter.name} - Trang ${chapterImage.order + 1}`}
                            />
                        )
                    })
                )
                : null}
        </div>
    )
}

export default ContentSection