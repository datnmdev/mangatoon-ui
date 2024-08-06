import { memo, useEffect, useRef, useState } from "react"
import api from "../../../../../../../../../../api"
import { Link, useNavigate } from 'react-router-dom'
import location from "../../../../../../../../../../routers/location"

function SearchResultItem({ 
    data
}) {
    const navigate = useNavigate()
    const [lastChapter, setLastChapter] = useState(null)
    const coverImageRef = useRef(null)

    useEffect(() => {
        async function getLastChapter() {
            try {
                const getChaptersByStoryId = (await api.chapter.getChapters({
                    storyId: data.id,
                    page: 1,
                    limit: 1
                })).data.data
                setLastChapter(getChaptersByStoryId.rows[0])
            } catch (error) {

            }
        }

        getLastChapter()
    }, [])

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
        <div className="flex justify-between space-x-4">
            <div className="shrink-0">
                <img
                    ref={coverImageRef}
                    className="w-[64px] h-[84px] rounded-sm object-cover object-center"
                    src={data.coverImageUrl}
                    alt={data.title}
                />
            </div>

            <div className="grow">
                <Link
                    className="hover:text-[#F08121] font-[450]"
                    onClick={(e) => {
                        e.preventDefault()
                        navigate(location.bookInfoPage(data))
                        window.location.reload()
                    }}
                >
                    <h3>{data.title}</h3>
                </Link>

                {lastChapter
                    && (
                        <Link
                            className='hover:text-[#F08121]'
                            onClick={(e) => {
                                e.preventDefault()
                                navigate(location.chapterContentPage(data, lastChapter))
                                window.location.reload()
                            }}
                        >
                            {lastChapter.name}
                        </Link>
                    )}
            </div>
        </div>
    )
}

export default memo(SearchResultItem)