import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../../api'
import { timeAgo } from '../../helpers/timer';
import location from '../../routers/location';

function Card({ data }) {
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
        <div className='overflow-hidden'>
            <div className='relative'>
                <div>
                    <Link to={location.bookInfoPage(data)}>
                        <img
                            className='rounded-[4px] w-full h-full object-cover object-center'
                            src={data.coverImageUrl ?? ''}
                            alt={data.title}
                        />
                    </Link>
                </div>

                <div className='absolute top-0 left-0 px-2 py-3'>
                    <span className='p-1.5 bg-[#56CBF2] text-white text-[0.95rem] rounded-[6px]'>{timeAgo(data.updatedAt)}</span>
                </div>
            </div>

            <div>
                <h3 className='line-clamp-1 text-center my-2 text-[1.2rem] font-[500] hover:text-[#F08121]'>
                    <Link to={location.bookInfoPage(data)}>
                        {data.title}
                    </Link>
                </h3>
                <div className='text-center'>
                    {lastChapter
                        && (
                            <Link
                                to={location.chapterContentPage(data, lastChapter)}
                                className='hover:text-[#F08121]'
                            >
                                {lastChapter.name}
                            </Link>
                        )}
                </div>
            </div>
        </div>
    )
}

export default Card