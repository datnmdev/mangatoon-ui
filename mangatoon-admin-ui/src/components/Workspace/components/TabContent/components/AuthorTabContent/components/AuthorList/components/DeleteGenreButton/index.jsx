import { useDispatch, useSelector } from "react-redux"
import { workspaceActions, workspaceAsyncThunks, workspaceSelectors } from "../../../../../../../../../../features/workspace/workspaceSlice"
import { useEffect, useState } from "react"
import { FAILED, IDLE, PENDING, SUCCEEDED } from "../../../../../../../../../../constants/fetchStatus"
import RoundButton from "../../../../../../../../../RoundButton"

export function DeleteAuthorButton({ authorId }) {
    const dispatch = useDispatch()
    const selectDeleteAuthorResponse = useSelector(workspaceSelectors.authorSelectors.selectDeleteAuthor)
    const [status, setStatus] = useState(IDLE)

    async function onDeleteAuthorClicked() {
        try {
            setStatus(PENDING)
            await dispatch(workspaceAsyncThunks.author.deleteAuthor(authorId)).unwrap()
            setStatus(SUCCEEDED)
        } catch (error) {
            setStatus(FAILED)
        }
    }

    useEffect(() => {
        if (status === SUCCEEDED && selectDeleteAuthorResponse.data) {
            dispatch(workspaceActions.deleteAuthor(authorId))
        }
    }, [status])

    return (
        <RoundButton
            icon={(<i className="fa-regular fa-trash-can"></i>)}
            color="red"
            onClick={onDeleteAuthorClicked}
        />
    )
}

export default DeleteAuthorButton