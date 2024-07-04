import { useContext, useEffect, useState } from "react"
import SearchInput from "../../../../../../../../../../../../../SearchInput"
import SubmitButton from "../../../../../../../../../../../../../SubmitButton"
import Table from "../../../../../../../../../../../../../Table"
import { useDispatch, useSelector } from "react-redux"
import { workspaceAsyncThunks, workspaceSelectors } from "../../../../../../../../../../../../../../features/workspace/workspaceSlice"
import { FAILED, IDLE, PENDING, SUCCEEDED } from "../../../../../../../../../../../../../../constants/fetchStatus"
import { AddStoryAuthorIWContext } from "../../../../../../../../contexts"

const headers = [
    'Id',
    'Name',
    'Thao tác'
]

function AuthorList() {
    const dispatch = useDispatch()
    const addStoryAuthorIWContext = useContext(AddStoryAuthorIWContext)
    const [limit] = useState(1)
    const [page, setPage] = useState(1)
    const [searchText, setSearchText] = useState('')
    const selectSearchAuthor = useSelector(workspaceSelectors.storyAuthorSelectors.selectSearchAuthor)
    const [searchAuthorStatus, setSearchAuthorStatus] = useState(IDLE)
    const selectGetAuthors = useSelector(workspaceSelectors.authorSelectors.selectAuthors)
    const [getAuthorsStatus, setGetAuthorsStatus] = useState(IDLE)
    const selectStoryAuthors = useSelector(workspaceSelectors.storyAuthorSelectors.selectGetStoryAuthorByStoryId)
    const [rows, setRows] = useState([])
    const selectCreateStoryAuthor = useSelector(workspaceSelectors.storyAuthorSelectors.selectCreateStoryAuthor)
    const [createStoryAuthorStatus, setCreateStoryAuthorStatus] = useState(IDLE)

    async function getAuthors() {
        try {
            setGetAuthorsStatus(PENDING)
            await dispatch(workspaceAsyncThunks.author.getAuthors()).unwrap()
            setGetAuthorsStatus(SUCCEEDED)
        } catch (error) {
            setGetAuthorsStatus(FAILED)
        }
    }

    async function handleCreateStoryAuthorSubmited(data) {
        try {
            setCreateStoryAuthorStatus(PENDING)
            await dispatch(workspaceAsyncThunks.storyAuthor.createStoryAuthor(data)).unwrap()
            setCreateStoryAuthorStatus(SUCCEEDED)
        } catch (error) {
            setCreateStoryAuthorStatus(FAILED)
        }
    }

    useEffect(() => {
        getAuthors()
    }, [])

    useEffect(() => {
        if (getAuthorsStatus === SUCCEEDED) {
            if (selectGetAuthors) {
                setRows(selectGetAuthors.map(author => {
                        const isAdded = selectStoryAuthors.some(storyAuthor => storyAuthor.author.id === author.id)
                        return [
                            author.id,
                            author.name,
                            (<SubmitButton
                                isInvalid={isAdded ? true : false}
                                status={createStoryAuthorStatus}
                                content={isAdded ? "Đã thêm" : "Thêm"}
                                onSubmit={() => handleCreateStoryAuthorSubmited({ authorId: author.id, storyId: addStoryAuthorIWContext.story.id })}
                            />)
                        ]
                    }))
            }
        }
    }, [getAuthorsStatus])

    useEffect(() => {
        async function searchAuthor(searchText) {
            try {
                setSearchAuthorStatus(PENDING)
                await dispatch(workspaceAsyncThunks.storyAuthor.searchAuthor(searchText)).unwrap()
                setSearchAuthorStatus(SUCCEEDED)
            } catch (error) {
                setSearchAuthorStatus(FAILED)
            }
        }

        if (searchText) {
            searchAuthor(searchText)
        } else {
            getAuthors()
        }
    }, [searchText])

    useEffect(() => {
        if (searchAuthorStatus === SUCCEEDED) {
            if (selectSearchAuthor.data) {
                setRows(selectSearchAuthor.data.map(author => {
                    const isAdded = selectStoryAuthors.some(storyAuthor => storyAuthor.author.id === author.id)
                    return [
                        author.id,
                        author.name,
                        (<SubmitButton
                            isInvalid={isAdded ? true : false}
                            status={createStoryAuthorStatus}
                            content={isAdded ? "Đã thêm" : "Thêm"}
                            onSubmit={() => handleCreateStoryAuthorSubmited({ authorId: author.id, storyId: addStoryAuthorIWContext.story.id })}
                        />)
                    ]
                }))
                setPage(1)
            }
        }
    }, [searchAuthorStatus])

    useEffect(() => {
        if (createStoryAuthorStatus === SUCCEEDED) {
            if (selectCreateStoryAuthor.data) {
                addStoryAuthorIWContext.setRefetchStoryAuthorList({
                    value: 1
                })
            }
        }
    }, [createStoryAuthorStatus])

    return (
        <div>
            <div>
                <SearchInput
                    placeholder="Tìm kiếm bằng id, tên tác giả..."
                    onChange={(e) => setSearchText(e.target.value)}
                />
            </div>

            <div className="mt-6">
                <Table
                    headers={headers}
                    data={rows.slice((page-1)*limit, page*limit)}
                    page={page}
                    count={Math.ceil(rows.length / limit)}
                    onPaginationChanged={(e, value) => setPage(value)}
                />
            </div>
        </div>
    )
}

export default AuthorList