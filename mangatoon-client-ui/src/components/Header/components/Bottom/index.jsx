import { Link } from 'react-router-dom'
import { memo, useEffect, useRef, useState } from 'react'
import api from '../../../../api'
import GenreDetail from './components/GenreDetail'
import location from '../../../../routers/location'
import IconButton from '../../../IconButton'

function Bottom({
    hiddenSearch,
    setHiddenSearch
}) {
    const [genres, setGenres] = useState([])
    const [hidden, setHidden] = useState(true)
    const [genreHidden, setGenreHidden] = useState(true)
    const genreDetailRef = useRef(null)

    useEffect(() => {
        async function getGenres() {
            try {
                const genres = (await api.genre.getGenres()).data.data
                setGenres(genres.length > 0 ? genres : [])
            } catch (error) {

            }
        }

        getGenres()
    }, [])

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (genreDetailRef.current && !genreDetailRef.current.contains(event.target)) {
                setGenreHidden(true)
            }
        }

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [])

    return (
        <nav className='bg-[#F08121] text-white'>
            <div className='flex justify-between items-center md:hidden md:container'>
                <div>
                    <IconButton
                        icon={hidden ? (<i className="fa-solid fa-bars text-[1.4rem]"></i>) : (<i className="fa-solid fa-rectangle-xmark text-[1.8rem]"></i>)}
                        backgroundColor='transparent'
                        onClick={() => setHidden(!hidden)}
                    />
                </div>

                <div>
                    <IconButton
                        icon={(<i className="fa-solid fa-magnifying-glass text-[1.4rem]"></i>)}
                        backgroundColor='transparent'
                        onClick={() => setHiddenSearch(!hiddenSearch)} 
                    />
                </div>
            </div>

            <ul
                className={`md:container md:mx-auto md:flex md:items-center sm:block ${hidden ? 'sm:hidden' : ''} sm:animate-dropdown bg-[#F08121]`}
            >
                <li
                    onClick={() => setHidden(true)}
                >
                    <Link
                        className='block px-6 sm:px-4 py-4 w-full hover:bg-[#F29C56]'
                        to={location.homePage()}
                    >
                        Trang Chủ
                    </Link>
                </li>

                <li
                    ref={genreDetailRef}
                    className='hover:bg-[#F29C56] select-none'
                >
                    <div
                        className='px-6 py-4 sm:px-4 space-x-1 cursor-pointer'
                        onClick={() => setGenreHidden(!genreHidden)}
                    >
                        <span>Thể Loại</span>
                        <span>
                            <i className="fa-solid fa-caret-down"></i>
                        </span>
                    </div>

                    {genres && !genreHidden
                        ? (
                            <GenreDetail
                                data={genres.map(genre => ({
                                    name: genre.name,
                                    link: location.booksOfGenrePage(genre)
                                }))}
                            />
                        )
                        : null}
                </li>

                <li
                    onClick={() => setHidden(true)}
                >
                    <Link
                        to={location.rankingPage()}
                        className='block px-6 sm:px-4 py-4 w-full hover:bg-[#F29C56]'
                    >
                        <div>
                            <div className='space-x-1'>
                                <span>Xếp Hạng</span>
                            </div>

                        </div>
                    </Link>
                </li>

                <li
                    onClick={() => setHidden(true)}
                >
                    <Link
                        to={location.historyPage()}
                        className='block px-6 sm:px-4 py-4 w-full hover:bg-[#F29C56]'
                    >
                        Lịch Sử
                    </Link>
                </li>

                <li
                    onClick={() => setHidden(true)}
                >
                    <Link
                        to={location.followPage()}
                        className='block px-6 sm:px-4 py-4 w-full hover:bg-[#F29C56]'
                    >
                        Theo Dõi
                    </Link>
                </li>

            </ul>
        </nav>
    )
}

export default memo(Bottom)