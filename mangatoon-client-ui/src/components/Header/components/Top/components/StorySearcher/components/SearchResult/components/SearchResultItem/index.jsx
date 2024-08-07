import { memo, useEffect, useState } from "react"
import api from "../../../../../../../../../../api"
import { Link, useNavigate } from 'react-router-dom'
import location from "../../../../../../../../../../routers/location"
import { urlOfStoryServiceGenerator } from "../../../../../../../../../../helpers/url"

function SearchResultItem({ 
    data
}) {
    const navigate = useNavigate()
    const [lastChapter, setLastChapter] = useState(null)

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

    return (
        <div className="flex justify-between space-x-4">
            <div className="shrink-0">
                <img
                    className="w-[64px] h-[84px] rounded-sm object-cover object-center"
                    src={urlOfStoryServiceGenerator(data.coverImageUrl)}
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