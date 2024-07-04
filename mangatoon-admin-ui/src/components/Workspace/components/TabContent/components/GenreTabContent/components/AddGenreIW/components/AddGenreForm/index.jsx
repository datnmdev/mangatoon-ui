import { useContext, useEffect, useState } from "react"
import TextEditor from "../../../../../../../../../TextEditor"
import TextInput from "../../../../../../../../../TextInput"
import SubmitButton from "../../../../../../../../../SubmitButton"
import { FAILED, IDLE, PENDING, SUCCEEDED } from "../../../../../../../../../../constants/fetchStatus"
import { useDispatch, useSelector } from "react-redux"
import { workspaceAsyncThunks, workspaceSelectors } from "../../../../../../../../../../features/workspace/workspaceSlice"
import { AddGenreContext } from "../../../../contexts"

function AddGenreForm() {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [status, setStatus] = useState(IDLE)
    const dispatch = useDispatch()
    const selectCreateGenreResponse = useSelector(workspaceSelectors.genreSelectors.selectCreateGenre)
    const addGenreContext = useContext(AddGenreContext)

    async function onSubmit() {
        try {
            setStatus(PENDING)
            await dispatch(workspaceAsyncThunks.genre.createGenre({
                name,
                description
            })).unwrap()
            setStatus(SUCCEEDED)
        } catch (error) {
            setStatus(FAILED)
        }
    }

    useEffect(() => {
        if (status === SUCCEEDED && selectCreateGenreResponse && selectCreateGenreResponse.data) {
            addGenreContext.setRefetchGenres({
                value: 1
            })
        }
    }, [status])

    return (
        <div className="space-y-4">
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

            <div>
                <div>
                    <div className="mb-1">Description</div>
                    <TextEditor
                        height={240}
                        value={description}
                        onChange={(content, editor) => setDescription(content)}

                    />
                </div>
            </div>

            <div className="flex justify-end">
                <div>
                    <SubmitButton 
                        isInvalid={name.length == 0 ? true : false}
                        content="Tạo"
                        status={status}
                        onSubmit={onSubmit}
                    />
                </div>
            </div>
        </div>
    )
}

export default AddGenreForm