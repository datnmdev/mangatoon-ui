import { useContext, useEffect, useState } from "react"
import SubmitButton from "../../../../../../../../../SubmitButton"
import TextEditor from "../../../../../../../../../TextEditor"
import TextInput from "../../../../../../../../../TextInput"
import { useDispatch, useSelector } from "react-redux"
import { workspaceAsyncThunks, workspaceSelectors } from "../../../../../../../../../../features/workspace/workspaceSlice"
import { UpdateGenreContext } from "../../../../contexts"
import { FAILED, IDLE, PENDING, SUCCEEDED } from "../../../../../../../../../../constants/fetchStatus"

function UpdateGenreForm() {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [submitStatus, setSubmitStatus] = useState(IDLE)
    const [getGenreByIdStatus, setGetGenreByIdStatus] = useState(IDLE)
    const dispatch = useDispatch()
    const selectUpdateGenreResponse = useSelector(workspaceSelectors.genreSelectors.selectUpdateGenre)
    const selectGetGenreByIdResponse = useSelector(workspaceSelectors.genreSelectors.selectGetGenreById)
    const updateGenreContext = useContext(UpdateGenreContext)

    async function onSubmit() {
        try {
            setSubmitStatus(PENDING)
            await dispatch(workspaceAsyncThunks.genre.updateGenre({
                id: updateGenreContext.genreId,
                name,
                description
            })).unwrap()
            setSubmitStatus(SUCCEEDED)
        } catch (error) {
            setSubmitStatus(FAILED)
        }
    }

    useEffect(() => {
        async function getGenreById() {
            try {
                setGetGenreByIdStatus(PENDING)
                await dispatch(workspaceAsyncThunks.genre.getGenreById(updateGenreContext.genreId)).unwrap()
                setGetGenreByIdStatus(SUCCEEDED)
            } catch (error) {
                setGetGenreByIdStatus(FAILED)
            }
        }

        getGenreById()
    }, [])

    useEffect(() => {
        if (getGenreByIdStatus === SUCCEEDED && selectGetGenreByIdResponse && selectGetGenreByIdResponse.data) {
            setName(selectGetGenreByIdResponse.data[0].name)
            setDescription(selectGetGenreByIdResponse.data[0].description)
        }
    }, [getGenreByIdStatus])

    useEffect(() => {
        if (submitStatus === SUCCEEDED && selectUpdateGenreResponse && selectUpdateGenreResponse.data) {
            updateGenreContext.setOpenUpdateGenreIW({
                ...updateGenreContext.openUpdateGenre,
                value: false
            })
            updateGenreContext.setRefetchGenres({
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
                        value={updateGenreContext.genreId}
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
                        content="Cập nhật"
                        submitStatus={submitStatus}
                        onSubmit={onSubmit}
                    />
                </div>
            </div>
        </div>
    )
}

export default UpdateGenreForm