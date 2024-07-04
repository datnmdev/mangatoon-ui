import { useContext, useEffect, useState } from "react"
import TextInput from "../../../../../../../../../TextInput"
import SubmitButton from "../../../../../../../../../SubmitButton"
import { FAILED, IDLE, PENDING, SUCCEEDED } from "../../../../../../../../../../constants/fetchStatus"
import { useDispatch, useSelector } from "react-redux"
import { workspaceAsyncThunks, workspaceSelectors } from "../../../../../../../../../../features/workspace/workspaceSlice"
import { AddAuthorContext } from "../../../../contexts"

function AddAuthorForm() {
    const [name, setName] = useState('')
    const [status, setStatus] = useState(IDLE)
    const dispatch = useDispatch()
    const selectCreateAuthorResponse = useSelector(workspaceSelectors.authorSelectors.selectCreateAuthor)
    const addAuthorContext = useContext(AddAuthorContext)

    async function onSubmit() {
        try {
            setStatus(PENDING)
            await dispatch(workspaceAsyncThunks.author.createAuthor({
                name
            })).unwrap()
            setStatus(SUCCEEDED)
        } catch (error) {
            setStatus(FAILED)
        }
    }

    useEffect(() => {
        if (status === SUCCEEDED && selectCreateAuthorResponse && selectCreateAuthorResponse.data) {
            addAuthorContext.setRefetchAuthors({
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

export default AddAuthorForm