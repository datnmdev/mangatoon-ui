import { useContext, useEffect, useState } from "react"
import SubmitButton from "../../../../../../../../../SubmitButton"
import TextInput from "../../../../../../../../../TextInput"
import { useDispatch, useSelector } from "react-redux"
import { workspaceAsyncThunks, workspaceSelectors } from "../../../../../../../../../../features/workspace/workspaceSlice"
import { UpdateAuthorContext } from "../../../../contexts"
import { FAILED, IDLE, PENDING, SUCCEEDED } from "../../../../../../../../../../constants/fetchStatus"

function UpdateAuthorForm() {
    const [name, setName] = useState('')
    const [submitStatus, setSubmitStatus] = useState(IDLE)
    const [getAuthorByIdStatus, setGetAuthorByIdStatus] = useState(IDLE)
    const dispatch = useDispatch()
    const selectUpdateAuthorResponse = useSelector(workspaceSelectors.authorSelectors.selectUpdateAuthor)
    const selectGetAuthorByIdResponse = useSelector(workspaceSelectors.authorSelectors.selectGetAuthorById)
    const updateAuthorContext = useContext(UpdateAuthorContext)

    async function onSubmit() {
        try {
            setSubmitStatus(PENDING)
            await dispatch(workspaceAsyncThunks.author.updateAuthor({
                id: updateAuthorContext.authorId,
                name
            })).unwrap()
            setSubmitStatus(SUCCEEDED)
        } catch (error) {
            setSubmitStatus(FAILED)
        }
    }

    useEffect(() => {
        async function getAuthorById() {
            try {
                setGetAuthorByIdStatus(PENDING)
                await dispatch(workspaceAsyncThunks.author.getAuthorById(updateAuthorContext.authorId)).unwrap()
                setGetAuthorByIdStatus(SUCCEEDED)
            } catch (error) {
                setGetAuthorByIdStatus(FAILED)
            }
        }

        getAuthorById()
    }, [])

    useEffect(() => {
        if (getAuthorByIdStatus === SUCCEEDED && selectGetAuthorByIdResponse && selectGetAuthorByIdResponse.data) {
            setName(selectGetAuthorByIdResponse.data[0].name)
        }
    }, [getAuthorByIdStatus])

    useEffect(() => {
        if (submitStatus === SUCCEEDED && selectUpdateAuthorResponse && selectUpdateAuthorResponse.data) {
            updateAuthorContext.setOpenUpdateAuthorIW({
                ...updateAuthorContext.openUpdateAuthor,
                value: false
            })
            updateAuthorContext.setRefetchAuthors({
                value: 1
            })
        }
    }, [submitStatus])

    return (
        <div className="space-y-4">
            <div>
                <label htmlFor="id">
                    <div className="mb-1">Id</div>
                    <TextInput
                        id="id"
                        value={updateAuthorContext.authorId}
                        disabled={true}
                    />
                </label>
            </div>

            <div>
                <label htmlFor="name">
                    <div className="mb-1">Name</div>
                    <TextInput
                        id="name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </label>
            </div>

            <div className="flex justify-end">
                <div>
                    <SubmitButton
                        isInvalid={name.length == 0 ? true : false}
                        content="Cập nhật"
                        submitStatus={submitStatus}
                        onSubmit={onSubmit}
                    />
                </div>
            </div>
        </div>
    )
}

export default UpdateAuthorForm