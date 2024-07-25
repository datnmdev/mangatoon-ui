import { useEffect, useState } from "react"
import SearchInput from "../../../../../../../../../../components/SearchInput"
import Table from "../../../../../../../../../../components/Table"
import Button from "../../../../../../../../../../components/Button"
import { SUCCEEDED } from "../../../../../../../../../../constants/fetchStatus.constant"
import useSearchAuthor from "./hooks/useSearchAuthor"
import useGetStoryAuthors from "./hooks/useGetStoryAuthors"
import useCreateStoryAuthor from "./hooks/useCreateStoryAuthor"

const headers = [
    'Id',
    'Name',
    'Thao tác'
]

function AuthorList({
    storyId,
    setRefetchStoryAuthorList
}) {
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 5
    })
    const [keyword, setKeyword] = useState('')
    const { data: authorData, status: searchAuthorStatus, setSubmit: setSearchAuthorSubmit } = useSearchAuthor({
        page: 1,
        limit: Number.MAX_SAFE_INTEGER,
        keyword
    })
    const { data: storyAuthorData, status: getStoryAuthorStatus, setSubmit: setGetStoryAuthorSubmit } = useGetStoryAuthors({
        storyId,
        page: 1,
        limit: Number.MAX_SAFE_INTEGER
    })
    const [createStoryAuthorId, setCreateStoryAuthorId] = useState(undefined)
    const { data: createStoryAuthorData, status: createStoryAuthorStatus, setSubmit: setCreateStoryAuthorSubmit } = useCreateStoryAuthor({
        storyId,
        authorId: createStoryAuthorId
    })

    let data = []
    if (authorData?.data && storyAuthorData?.data) {
        data = authorData.data.rows.filter(author => {
            return !(storyAuthorData.data.rows
                .map(storyAuthor => storyAuthor.author)
                .some(_author => _author.id === author.id))
        }).slice((pagination.page - 1) * pagination.limit, pagination.page * pagination.limit).map(author => {
            return [
                author.id,
                author.name,
                (
                    <Button
                        backgroundColor="rgb(33, 197, 93)"
                        onClick={() => setCreateStoryAuthorId(author.id)}
                    >
                        Thêm
                    </Button>
                )
            ]
        })
    }

    useEffect(() => {
        setSearchAuthorSubmit(true)
        setGetStoryAuthorSubmit(true)
    }, [pagination.page, keyword])

    useEffect(() => {
        if (createStoryAuthorId !== undefined) {
            setCreateStoryAuthorSubmit(true)
        }
    }, [createStoryAuthorId])

    useEffect(() => {
        if (createStoryAuthorStatus === SUCCEEDED) {
            if (createStoryAuthorData.data) {
                setRefetchStoryAuthorList({
                    value: true
                })
                setSearchAuthorSubmit(true)
                setGetStoryAuthorSubmit(true)
            }
        }
    }, [createStoryAuthorStatus])

    return (
        <div>
            <div>
                <SearchInput
                    placeholder="Tìm kiếm bằng id, tên tác giả..."
                    onChange={(e) => setKeyword(e.target.value)}
                />
            </div>

            <div className="mt-6">
                <Table
                    headers={headers}
                    data={data}
                    page={pagination.page}
                    count={authorData?.data ? Math.ceil(authorData.data.count / pagination.limit) : 1}
                    onPaginationChanged={(e, page) => setPagination({
                        ...pagination,
                        page
                    })}
                />
            </div>
        </div>
    )
}

export default AuthorList