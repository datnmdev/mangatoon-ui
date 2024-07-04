import { useDispatch, useSelector } from "react-redux"
import { workspaceActions, workspaceAsyncThunks, workspaceSelectors } from "../../../../../../../../../../features/workspace/workspaceSlice"
import { useEffect, useState } from "react"
import { FAILED, IDLE, PENDING, SUCCEEDED } from "../../../../../../../../../../constants/fetchStatus"
import RoundButton from "../../../../../../../../../RoundButton"

export function DeleteGenreButton({ genreId }) {
    const dispatch = useDispatch()
    const selectDeleteGenreResponse = useSelector(workspaceSelectors.genreSelectors.selectDeleteGenre)
    const [status, setStatus] = useState(IDLE)

    async function onDeleteGenreClicked() {
        try {
            setStatus(PENDING)
            await dispatch(workspaceAsyncThunks.genre.deleteGenre(genreId)).unwrap()
            setStatus(SUCCEEDED)
        } catch (error) {
            setStatus(FAILED)
        }
    }

    useEffect(() => {
        if (status === SUCCEEDED && selectDeleteGenreResponse.data) {
            dispatch(workspaceActions.deleteGenre(genreId))
        }
    }, [status])

    return (
        <RoundButton
            icon={(<i className="fa-regular fa-trash-can"></i>)}
            color="red"
            onClick={onDeleteGenreClicked}
        />
    )
}

export default DeleteGenreButton