import { Link } from 'react-router-dom'
import colors from '../../../../assets/colors'
import { useEffect, useState } from 'react'
import api from '../../../../api'
import GenreDetail from './components/GenreDetail'
import location from '../../../../routers/location'
import IconButton from '../../../IconButton'

function Bottom() {
    const [genres, setGenres] = useState([])
    const [hidden, setHidden] = useState(true)
    const [genreHidden, setGenreHidden] = useState(true)

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

    return (
        <nav
            style={{
                backgroundColor: colors.primaryColor
            }}
        >
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
                    />
                </div>
            </div>

            <ul
                className={`md:container md:mx-auto md:flex md:items-center sm:block ${hidden ? 'sm:hidden' : ''} sm:animate-dropdown`}
                style={{
                    color: colors.textPrimaryColor
                }}
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
                            <div>
                                <GenreDetail
                                    data={genres.map(genre => ({
                                        name: genre.name,
                                        link: location.booksOfGenrePage(genre)
                                    }))}
                                />
                            </div>
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

export default Bottom