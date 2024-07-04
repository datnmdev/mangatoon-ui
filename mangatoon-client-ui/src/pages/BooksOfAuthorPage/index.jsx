import { useEffect, useState } from "react"
import { useParams } from 'react-router-dom'
import api from "../../api"
import Filter from "./components/Filter"
import CardList from "../../components/CardList"

function BooksOfAuthorPage() {
    const { authorId } = useParams()
    const [filterData, setFilterData] = useState({
        author: {
            id: authorId
        },
        status: 1
    })
    const [filteredStories, setFilteredStories] = useState(null)
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 42
    })

    useEffect(() => {
        async function getAuthor() {
            try {
                const author = (await api.author.getAuthors({
                    id: filterData.author.id
                })).data.data?.[0]

                setFilterData({
                    ...filterData,
                    author
                })
            } catch (error) {
    
            }
        }

        getAuthor()
    }, [filterData.status])

    useEffect(() => {
        async function getFilteredStories() {
            try {
                const filteredStories = (await api.storyAuthor.getStoryAuthors({
                    authorId: filterData.author.id,
                    status: filterData.status,
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
        <div className="py-8">
            <div className="container mx-auto space-y-4">
                <div>
                    {filterData.author.name
                        ? (
                            <div className="flex items-center space-x-2 text-[#56CBF2]">
                                <span className="text-[1.4rem]">
                                    <i className="fa-solid fa-flag"></i>
                                </span>
                                <h3 className="text-[1.2rem] font-[450]">Truyện của tác giả {filterData.author.name}</h3>
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
                                key={crypto.randomUUID()}
                                data={filteredStories.rows.map(storyAuthor => storyAuthor.story)}
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

export default BooksOfAuthorPage