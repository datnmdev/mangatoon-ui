import { useDispatch, useSelector } from "react-redux"
import SubmitButton from "../../../../../../../../../../../SubmitButton"
import TextInput from "../../../../../../../../../../../TextInput"
import { useContext, useEffect, useState } from "react"
import { AddAliasIWContext } from "../../../../../../contexts"
import { FAILED, IDLE, PENDING, SUCCEEDED } from "../../../../../../../../../../../../constants/fetchStatus"
import { workspaceAsyncThunks, workspaceSelectors } from "../../../../../../../../../../../../features/workspace/workspaceSlice"

function AddAliasForm() {
    const dispatch = useDispatch()
    const addAliasIWContext = useContext(AddAliasIWContext)
    const [title, setTitle] = useState('')
    const [storyId] = useState(addAliasIWContext.story.id)
    const [submitStatus, setSubmitStatus] = useState(IDLE)
    const createAliasResponse = useSelector(workspaceSelectors.aliasSelectors.selectCreateAlias)

    async function onSubmit() {
        try {
            setSubmitStatus(PENDING)
            await dispatch(workspaceAsyncThunks.alias.createAlias({
                title,
                storyId
            })).unwrap()
            setSubmitStatus(SUCCEEDED)
        } catch (error) {
            setSubmitStatus(FAILED)
        }
    }

    useEffect(() => {
        if (submitStatus === SUCCEEDED) {
            if (createAliasResponse.data) {
                addAliasIWContext.setRefetchAliasList({
                    value: 1
                })
            }
        }
    }, [submitStatus])

    return (
        <div>
            <div className="space-y-4">
                <div>
                    <div>Title</div>
                    <TextInput 
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

                <div>
                    <div>Story Id</div>
                    <TextInput
                        value={addAliasIWContext.story.id}
                        disabled={true}
                    />
                </div>
            </div>

            <div className="flex justify-end mt-4">
                <div>
                    <SubmitButton
                        isInvalid={title ? false : true}
                        content="Tạo"
                        status={submitStatus}
                        onSubmit={onSubmit}
                    />
                </div>
            </div>
        </div>
    )
}

export default AddAliasForm