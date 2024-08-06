import { useEffect, useState } from 'react'
import api from '../../../../api'
import { Link } from 'react-router-dom'
import { timeAgo } from '../../../../helpers/timer'
import location from '../../../../routers/location'
import View from './components/View'

function ChapterList({ book }) {
    const [chapters, setChapters] = useState(null)

    useEffect(() => {
        async function getChapters() {
            try {
                const chapters = (await api.chapter.getChapters({
                    storyId: book.id,
                    page: 1,
                    limit: Number.MAX_SAFE_INTEGER
                })).data.data.rows
                setChapters(chapters)
            } catch (error) {

            }
        }

        getChapters()
    }, [])

    return (
        <div>
            <div>
                <div className='text-[1.25rem] text-[#F08121] space-x-2'>
                    <span>
                        <i className='fa-solid fa-database'></i>
                    </span>

                    <span>Danh sách chương</span>
                </div>
            </div>

            <div className='mt-2'>
                <ul className='max-h-[500px] border-2 rounded-[6px] p-4 overflow-y-auto'>
                    {chapters !== null
                        ? (
                            chapters.map(chapter => {
                                return (
                                    <li
                                        key={chapter.id}
                                        className='flex justify-between items-center py-2 border-b-[1px]'
                                    >
                                        <Link
                                            to={location.chapterContentPage(book, chapter)}
                                            className='hover:text-[#F08121]'
                                        >
                                            {chapter.name}
                                        </Link>

                                        <View
                                            chapterId={chapter.id}
                                        />

                                        <span>{timeAgo(chapter.updatedAt)}</span>
                                    </li>
                                )
                            })
                        )
                        : null}
                </ul>
            </div>
        </div>
    )
}

export default ChapterList