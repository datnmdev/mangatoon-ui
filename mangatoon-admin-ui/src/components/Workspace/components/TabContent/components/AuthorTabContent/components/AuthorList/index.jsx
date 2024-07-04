import { useDispatch, useSelector } from "react-redux"
import Table from "../../../../../../../Table"
import { workspaceActions, workspaceAsyncThunks, workspaceSelectors } from "../../../../../../../../features/workspace/workspaceSlice"
import { useContext, useEffect, useState } from "react"
import { FAILED, IDLE, PENDING, SUCCEEDED } from "../../../../../../../../constants/fetchStatus"
import Loader from "../../../../../../../Loader"
import RoundButton from "../../../../../../../RoundButton"
import { AuthorListContext } from "../../contexts"
import DeleteAuthorButton from "./components/DeleteGenreButton"

const headers = [
    'Id',
    'Name',
    'Thao tác'
]

function AuthorList({ refetch = { value: 0 } }) {
    const selectedTab = useSelector(workspaceSelectors.selectSelectedTab)
    const selectAuthors = useSelector(workspaceSelectors.authorSelectors.selectAuthors)
    const dispatch = useDispatch()
    const [status, setStatus] = useState(IDLE)
    const [limit] = useState(10)
    const selectAuthorPage = useSelector(workspaceSelectors.authorSelectors.selectAuthorPage)
    const [page, setPage] = useState(selectAuthorPage ? selectAuthorPage : 1)
    const authorListContext = useContext(AuthorListContext)

    async function getAuthors(tabId) {
        try {
            setStatus(PENDING)
            await dispatch(workspaceAsyncThunks.author.getAuthors(tabId)).unwrap()
            setStatus(SUCCEEDED)
        } catch (error) {
            setStatus(FAILED)
        }
    }

    let authorElements

    if (selectAuthors) {
        authorElements = selectAuthors.slice((page - 1) * limit, page * limit)
            .map(author => {
                return ([
                    author.id,
                    author.name,
                    author.description || author.description?.length > 0
                        ? (
                            <div dangerouslySetInnerHTML={{ __html: author.description }}></div>
                        )
                        : (
                            <div className="italic">null</div>
                        ),
                    <div className="flex justify-center items-center space-x-1">
                        <RoundButton
                            onClick={() => {
                                return authorListContext.setOpenUpdateAuthorIW({
                                    value: true,
                                    key: crypto.randomUUID(),
                                    authorId: author.id
                                })
                            }}
                        />

                        <DeleteAuthorButton
                            authorId={author.id}
                        />
                    </div>
                ])
            })
    }

    useEffect(() => {
        if (!selectAuthors) {
            getAuthors(selectedTab.id)
        }
    }, [])

    useEffect(() => {
        if (refetch.value) {
            getAuthors(selectedTab.id)
        }
    }, [refetch])

    useEffect(() => {
        if (page > 1 && Math.ceil(selectAuthors.length / limit) < page) {
            setPage(page - 1)
        }
    }, [selectAuthors])

    useEffect(() => {
        dispatch(workspaceActions.saveAuthorPage(page))
    }, [page])

    return (
        <Loader status={status}>
            {selectAuthors
                && (
                    <Table
                        headers={headers}
                        data={authorElements}
                        count={Math.ceil(selectAuthors.length / limit)}
                        page={page}
                        onPaginationChanged={(e, value) => setPage(value)}
                    />
                )}
        </Loader>
    )
}

export default AuthorList