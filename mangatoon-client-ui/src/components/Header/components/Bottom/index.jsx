import { Link } from 'react-router-dom'
import colors from '../../../../assets/colors'
import { useEffect, useState } from 'react'
import api from '../../../../api'
import GenreDetail from './components/GenreDetail'
import location from '../../../../routers/location'

function Bottom() {
    const [genres, setGenres] = useState([])

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
            <ul
                className='container mx-auto flex font-[500]'
                style={{
                    color: colors.textPrimaryColor
                }}
            >
                <li>
                    <Link
                        className='block px-6 py-4 hover:bg-[#F29C56]'
                        to={location.homePage()}
                    >
                        Trang Chủ
                    </Link>
                </li>

                <li className='group/parent hover:bg-[#F29C56] select-none'>
                    <div className='px-6 py-4 space-x-1'>
                        <span>Thể Loại</span>
                        <span>
                            <i className="fa-solid fa-caret-down"></i>
                        </span>
                    </div>

                    {genres
                        && (
                            <div className='hidden group-hover/parent:block'>
                                <GenreDetail
                                    data={genres.map(genre => ({
                                        name: genre.name,
                                        link: location.booksOfGenrePage(genre)
                                    }))}
                                />
                            </div>

                        )}
                </li>

                <li>
                    <Link
                        className='block px-6 py-4 hover:bg-[#F29C56]'
                    >
                        <div>
                            <div className='space-x-1'>
                                <span>Xếp Hạng</span>
                                <span>
                                    <i className="fa-solid fa-caret-down"></i>
                                </span>
                            </div>

                        </div>
                    </Link>
                </li>

                <li>
                    <Link
                        to={location.historyPage()}
                        className='block px-6 py-4 hover:bg-[#F29C56]'
                    >
                        Lịch Sử
                    </Link>
                </li>

                <li>
                    <Link
                        to={location.followPage()}
                        className='block px-6 py-4 hover:bg-[#F29C56]'
                    >
                        Theo Dõi
                    </Link>
                </li>

            </ul>
        </nav>
    )
}

export default Bottom