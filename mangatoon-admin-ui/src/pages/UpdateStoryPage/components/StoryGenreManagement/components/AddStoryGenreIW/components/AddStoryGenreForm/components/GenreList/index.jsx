import { useEffect, useState } from "react"
import SearchInput from "../../../../../../../../../../components/SearchInput"
import Table from "../../../../../../../../../../components/Table"
import useSearchGenre from "./hooks/useSearchGenre"
import useGetStoryGenres from "./hooks/useGetStoryGenres"
import Button from "../../../../../../../../../../components/Button"
import { SUCCEEDED } from "../../../../../../../../../../constants/fetchStatus.constant"
import useCreateStoryGenre from "./hooks/useCreateStoryGenre"

const headers = [
    'Id',
    'Name',
    'Thao tác'
]

function GenreList({
    storyId,
    setRefetchStoryGenreList
}) {
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 5
    })
    const [keyword, setKeyword] = useState('')
    const { data: genreData, status: searchGenreStatus, setSubmit: setSearchGenreSubmit } = useSearchGenre({
        page: 1,
        limit: Number.MAX_SAFE_INTEGER,
        keyword
    })
    const { data: storyGenreData, status: getStoryGenreStatus, setSubmit: setGetStoryGenreSubmit } = useGetStoryGenres({
        storyId,
        page: 1,
        limit: Number.MAX_SAFE_INTEGER
    })
    const [createStoryGenreId, setCreateStoryGenreId] = useState(undefined)
    const { data: createStoryGenreData, status: createStoryGenreStatus, setSubmit: setCreateStoryGenreSubmit } = useCreateStoryGenre({
        storyId,
        genreId: createStoryGenreId
    })

    let data = []
    if (genreData?.data && storyGenreData?.data) {
        data = genreData.data.rows.filter(genre => {
            return !(storyGenreData.data.rows
                .map(storyGenre => storyGenre.genre)
                .some(_genre => _genre.id === genre.id))
        }).slice((pagination.page - 1) * pagination.limit, pagination.page * pagination.limit).map(genre => {
            return [
                genre.id,
                genre.name,
                (
                    <Button
                        backgroundColor="rgb(33, 197, 93)"
                        onClick={() => setCreateStoryGenreId(genre.id)}
                    >
                        Thêm
                    </Button>
                )
            ]
        })
    }

    useEffect(() => {
        setSearchGenreSubmit(true)
        setGetStoryGenreSubmit(true)
    }, [pagination.page, keyword])

    useEffect(() => {
        if (createStoryGenreId !== undefined) {
            setCreateStoryGenreSubmit(true)
        }
    }, [createStoryGenreId])

    useEffect(() => {
        if (createStoryGenreStatus === SUCCEEDED) {
            if (createStoryGenreData.data) {
                setRefetchStoryGenreList({
                    value: true
                })
                setSearchGenreSubmit(true)
                setGetStoryGenreSubmit(true)
            }
        }
    }, [createStoryGenreStatus])

    return (
        <div>
            <div>
                <SearchInput
                    placeholder="Tìm kiếm bằng id, tên thể loại..."
                    onChange={(e) => setKeyword(e.target.value)}
                />
            </div>

            <div className="mt-6">
                <Table
                    headers={headers}
                    data={data}
                    page={pagination.page}
                    count={genreData?.data ? Math.ceil(genreData.data.count / pagination.limit) : 1}
                    onPaginationChanged={(e, page) => setPagination({
                        ...pagination,
                        page
                    })}
                />
            </div>
        </div>
    )
}

export default GenreList