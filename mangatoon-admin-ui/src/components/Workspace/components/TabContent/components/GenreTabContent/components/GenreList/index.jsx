import { useDispatch, useSelector } from "react-redux"
import Table from "../../../../../../../Table"
import { workspaceActions, workspaceAsyncThunks, workspaceSelectors } from "../../../../../../../../features/workspace/workspaceSlice"
import { useContext, useEffect, useState } from "react"
import { FAILED, IDLE, PENDING, SUCCEEDED } from "../../../../../../../../constants/fetchStatus"
import Loader from "../../../../../../../Loader"
import RoundButton from "../../../../../../../RoundButton"
import DeleteGenreButton from "./components/DeleteGenreButton"
import { GenreListContext } from "../../contexts"

const headers = [
    'Id',
    'Name',
    'Description',
    'Thao tác'
]

function GenreList({ refetch = { value: 0 } }) {
    const selectedTab = useSelector(workspaceSelectors.selectSelectedTab)
    const selectGenres = useSelector(workspaceSelectors.genreSelectors.selectGenres)
    const dispatch = useDispatch()
    const [status, setStatus] = useState(IDLE)
    const [limit] = useState(10)
    const selectGenrePage = useSelector(workspaceSelectors.genreSelectors.selectGenrePage)
    const [page, setPage] = useState(selectGenrePage ? selectGenrePage : 1)
    const genreListContext = useContext(GenreListContext)

    async function getGenres(tabId) {
        try {
            setStatus(PENDING)
            await dispatch(workspaceAsyncThunks.genre.getGenres(tabId)).unwrap()
            setStatus(SUCCEEDED)
        } catch (error) {
            setStatus(FAILED)
        }
    }

    let genreElements

    if (selectGenres) {
        genreElements = selectGenres.slice((page - 1) * limit, page * limit)
            .map(genre => {
                return ([
                    genre.id,
                    genre.name,
                    genre.description || genre.description?.length > 0
                        ? (
                            <div dangerouslySetInnerHTML={{ __html: genre.description }}></div>
                        )
                        : (
                            <div className="italic">null</div>
                        ),
                    <div className="flex justify-center items-center space-x-1">
                        <RoundButton
                            onClick={() => {
                                return genreListContext.setOpenUpdateGenreIW({
                                    value: true,
                                    key: crypto.randomUUID(),
                                    genreId: genre.id
                                })
                            }}
                        />

                        <DeleteGenreButton
                            genreId={genre.id}
                        />
                    </div>
                ])
            })
    }

    useEffect(() => {
        if (!selectGenres) {
            getGenres(selectedTab.id)
        }
    }, [])

    useEffect(() => {
        if (refetch.value) {
            getGenres(selectedTab.id)
        }
    }, [refetch])

    useEffect(() => {
        if (page > 1 && Math.ceil(selectGenres.length / limit) < page) {
            setPage(page - 1)
        }
    }, [selectGenres])

    useEffect(() => {
        dispatch(workspaceActions.saveGenrePage(page))
    }, [page])

    return (
        <Loader status={status}>
            {selectGenres
                && (
                    <Table
                        headers={headers}
                        data={genreElements}
                        count={Math.ceil(selectGenres.length / limit)}
                        page={page}
                        onPaginationChanged={(e, value) => setPage(value)}
                    />
                )}
        </Loader>
    )
}

export default GenreList