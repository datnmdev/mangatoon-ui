import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import api from "../../api"
import Filter from "./components/Filter"
import CardList from "../../components/CardList"
import location from "../../routers/location"
import { v4 } from 'uuid'

function BooksOfGenrePage() {
    const navigate = useNavigate()
    const { genreId } = useParams()
    const [filterData, setFilterData] = useState({
        genre: {
            value: genreId
        },
        status: 1,
        country: {
            value: 78,
            name: 'Trung Quốc'
        }
    })
    const [filteredStories, setFilteredStories] = useState(null)
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 42
    })

    useEffect(() => {
        async function getGenre() {
            try {
                const genre = (await api.genre.getGenres({
                    id: filterData.genre.value
                })).data.data?.[0]
                navigate(location.booksOfGenrePage(genre))
                setFilterData({
                    ...filterData,
                    genre: {
                        value: genre.id,
                        name: genre.name
                    }
                })
            } catch (error) {
    
            }
        }

        getGenre()
        setPagination({
            ...pagination,
            page: 1
        })
    }, [filterData.genre.value])

    useEffect(() => {
        async function getFilteredStories() {
            try {
                const filteredStories = (await api.storyGenre.getStoryGenres({
                    genreId: filterData.genre.value,
                    status: filterData.status,
                    countryId: filterData.country.value,
                    page: pagination.page,
                    limit: pagination.limit
                })).data.data
                setFilteredStories(filteredStories)
            } catch (error) {

            }
        }

        getFilteredStories()
    }, [filterData, pagination])

    return (
        <div className="py-8 sm:px-2">
            <div className="container mx-auto space-y-4">
                <div>
                    {filterData.genre.name
                        ? (
                            <div className="flex items-center space-x-2 text-[#56CBF2]">
                                <span className="text-[1.4rem]">
                                    <i className="fa-solid fa-flag"></i>
                                </span>
                                <h3 className="text-[1.2rem] font-[450]">Truyện {filterData.genre.name}</h3>
                            </div>
                        )
                        : null}
                </div>

                <div>
                    {filterData
                        ? (
                            <Filter
                                value={filterData}
                                onChange={value => setFilterData(value)}
                            />
                        )
                        : null}
                </div>

                <div>
                    {filteredStories
                        ? (
                            <CardList
                                key={v4()}
                                data={filteredStories.rows.map(storyGenre => storyGenre.story)}
                                totalPage={Math.ceil(filteredStories.count / pagination.limit)}
                                page={pagination.page}
                                onChange={(e, value) => setPagination({
                                    ...pagination,
                                    page: value
                                })}
                            />
                        )
                        : null}
                </div>
            </div>
        </div>
    )
}

export default BooksOfGenrePage