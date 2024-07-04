import { useEffect, useState } from 'react'
import api from '../../../../api'
import { Link, useNavigate } from 'react-router-dom'
import { FINISHED, IN_PROGRESS, SUSPENDED } from './constants'
import BorderedButton from '../../../../components/BorderedButton'
import IconButton from '../../../../components/IconButton'
import location from '../../../../routers/location'
import FollowButton from './components/FollowButton'
import useGetFollowCount from './hooks/useGetFollowCount'
import { PENDING } from '../../../../constants/fetchStatus.constant'
import RatingSection from './components/RatingSection'
import { Skeleton } from '@mui/material'
import useGetRatingInfoOfStory from './hooks/useGetRatingInfoOfStory'

function BookInfo({ data }) {
    const navigate = useNavigate()
    const [alias, setAlias] = useState(null)
    const [storyAuthor, setStoryAuthor] = useState(null)
    const { data: getFollowCountData, status: getFollowCountStatus, setSubmit: setGetFollowCountSubmit } = useGetFollowCount(data.id)
    const [viewCount, setViewCount] = useState(null)
    const { data: getRatingInfoOfStoryData, status: getRatingInfoOfStoryStatus, setSubmit: setRatingInfoOfStorySubmit } = useGetRatingInfoOfStory(data.id)
    const [storyGenres, setStoryGenres] = useState(null)
    const [firstChapter, setFirstChapter] = useState(null)

    useEffect(() => {
        async function getAlias() {
            try {
                const alias = (await api.alias.getAlias({
                    storyId: data.id
                })).data.data
                setAlias(alias)
            } catch (error) {

            }
        }

        async function getStoryAuthor() {
            try {
                const storyAuthors = (await api.storyAuthor.getStoryAuthors({
                    storyId: data.id,
                    page: 1,
                    limit: Number.MAX_SAFE_INTEGER
                })).data.data.rows
                setStoryAuthor(storyAuthors)
            } catch (error) {

            }
        }

        async function getViewCount() {
            try {
                const viewCount = (await api.viewDetail.getViewCountOfStory(data.id)).data.data.viewCount
                setViewCount(viewCount)
            } catch (error) {
            }
        }

        async function getStoryGenres() {
            try {
                const storyGenres = (await api.storyGenre.getStoryGenres({
                    storyId: data.id,
                    page: 1,
                    limit: Number.MAX_SAFE_INTEGER
                })).data.data.rows
                setStoryGenres(storyGenres)
            } catch (error) {
            }
        }

        async function getFirstChapter() {
            try {
                const firstChapter = (await api.chapter.getChapters({
                    storyId: data.id,
                    order: 1,
                    page: 1,
                    limit: 1
                })).data.data.rows?.[0]
                setFirstChapter(firstChapter)
            } catch (error) {

            }
        }

        getAlias()
        getStoryAuthor()
        getViewCount()
        getStoryGenres()
        getFirstChapter()
    }, [])

    useEffect(() => {
        setGetFollowCountSubmit(true)
        setRatingInfoOfStorySubmit(true)
    }, [])

    return (
        <div className='flex justify-between space-x-8'>
            <div>
                <img
                    className='rounded-[6px] shadow-[0_0_8px_0_#757575]'
                    src={data.coverImageUrl}
                    alt={data.title}
                />
            </div>

            <div className='grow'>
                <h3 className='text-[1.4rem] font-[350]'>{data.title}</h3>

                <ul className='space-y-2 mt-3'>
                    <li className='flex justify-between items-center'>
                        <div className='space-x-2 w-40'>
                            <span>
                                <i className='fa-solid fa-plus'></i>
                            </span>

                            <span>Tên khác</span>
                        </div>

                        <div className='grow'>
                            {alias
                                ? (
                                    alias.length > 0
                                        ? (
                                            alias.reduce((acc, alias, index) => {
                                                return (
                                                    acc ? [...acc, ', ', <span key={index}>{alias.title}</span>] : [<span key={index}>{alias.title}</span>]
                                                )
                                            }, null)
                                        )
                                        : 'Đang Cập Nhật'
                                )
                                : null}
                        </div>
                    </li>

                    <li className='flex justify-between items-center'>
                        <div className='space-x-2 w-40'>
                            <span>
                                <i className='fa-solid fa-user'></i>
                            </span>

                            <span>Tác giả</span>
                        </div>

                        <div className='grow'>
                            {storyAuthor
                                ? (
                                    storyAuthor.length > 0
                                        ? (
                                            storyAuthor.reduce((acc, storyAuthor, index) => {
                                                return (
                                                    acc
                                                        ? ([
                                                            ...acc,
                                                            ', ',
                                                            <Link
                                                                to={location.booksOfAuthorPage(storyAuthor.author)}
                                                                key={index}
                                                                className='hover:underline hover:text-[#F08121]'
                                                            >
                                                                {storyAuthor.author.name}
                                                            </Link>
                                                        ])
                                                        : ([
                                                            <Link
                                                                to={location.booksOfAuthorPage(storyAuthor.author)}
                                                                key={index}
                                                                className='hover:underline hover:text-[#F08121]'
                                                            >
                                                                {storyAuthor.author.name}
                                                            </Link>
                                                        ])
                                                )
                                            }, null)
                                        )
                                        : 'Đang Cập Nhật'
                                )
                                : null}
                        </div>
                    </li>

                    <li className='flex justify-between items-center'>
                        <div className='space-x-2 w-40'>
                            <span>
                                <i className='fa-solid fa-rss'></i>
                            </span>

                            <span>Tình trạng</span>
                        </div>

                        <div className='grow'>
                            {data.status === IN_PROGRESS && 'Đang Tiến Hành'}
                            {data.status === SUSPENDED && 'Đang Tạm Hoãn'}
                            {data.status === FINISHED && 'Đã Hoàn Thành'}
                        </div>
                    </li>

                    <li className='flex justify-between items-center'>
                        <div className='space-x-2 w-40'>
                            <span>
                                <i className='fa-solid fa-heart'></i>
                            </span>

                            <span>Lượt theo dõi</span>
                        </div>

                        <div className='grow'>
                            {getFollowCountStatus === PENDING || !getFollowCountData?.data
                                ? (
                                    <Skeleton variant='rounded' animation='wave'>
                                        <span className='inline-block w-20 h-5'></span>
                                    </Skeleton>
                                )
                                : (
                                    <span>{getFollowCountData.data.followCount}</span>
                                )}
                        </div>
                    </li>

                    <li className='flex justify-between items-center'>
                        <div className='space-x-2 w-40'>
                            <span>
                                <i className='fa-regular fa-eye'></i>
                            </span>

                            <span>Lượt xem</span>
                        </div>

                        <div className='grow'>
                            {viewCount != null
                                ? (
                                    <span>{viewCount}</span>
                                )
                                : null}
                        </div>
                    </li>

                    <li className='space-y-3'>
                        <div className='flex justify-between items-center'>
                            <div className='space-x-2 w-40'>
                                <span>
                                    <i className='fa-regular fa-star'></i>
                                </span>

                                <span>Đánh giá</span>
                            </div>

                            <div className='grow'>
                                {getRatingInfoOfStoryStatus === PENDING || !getRatingInfoOfStoryData?.data
                                    ? (
                                        <Skeleton 
                                            variant='rounded' 
                                            animation='wave'
                                        >
                                            <div className='space-x-2'>
                                                <span className='px-4 py-2 bg-[#aa00ff] text-center font-[600] rounded-[6px] text-white'>0.0</span>
                                                <span>-</span>
                                                <span className='min-w-[220px]'>Skeleton lượt đánh giá</span>
                                            </div>
                                        </Skeleton>
                                    )
                                    : (
                                        <div className='space-x-2'>
                                            <span className='px-4 py-2 bg-[#aa00ff] text-center font-[600] rounded-[6px] text-white'>{(getRatingInfoOfStoryData.data.rating * 5).toFixed(1)}</span>
                                            <span>-</span>
                                            <span>{getRatingInfoOfStoryData.data.ratingCount} lượt đánh giá</span>
                                        </div>
                                    )}
                            </div>
                        </div>

                        <RatingSection 
                            book={data}
                            setRatingInfoOfStorySubmit={setRatingInfoOfStorySubmit}
                        />
                    </li>
                </ul >

                <div className='flex flex-wrap'>
                    {storyGenres
                        ? (
                            storyGenres.map(storyGenre => {
                                return (
                                    <Link
                                        key={storyGenre.genre.id}
                                        className='mr-2 mt-2'
                                        to={location.booksOfGenrePage(storyGenre.genre)}
                                    >
                                        <BorderedButton>
                                            {storyGenre.genre.name}
                                        </BorderedButton>
                                    </Link>
                                )
                            })
                        )
                        : null}
                </div>

                <div className='flex items-center mt-4 space-x-2'>
                    <IconButton
                        onClick={() => {
                            if (firstChapter) {
                                navigate(location.chapterContentPage(data, firstChapter))
                                window.location.reload()
                            }
                        }}
                    >
                        Đọc Từ Đầu
                    </IconButton>

                    <FollowButton
                        book={data}
                        setGetFollowCountSubmit={setGetFollowCountSubmit}
                    />
                </div>
            </div >
        </div >
    )
}

export default BookInfo