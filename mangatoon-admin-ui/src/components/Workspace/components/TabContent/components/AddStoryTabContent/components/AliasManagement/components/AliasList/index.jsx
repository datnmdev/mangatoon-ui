import { useDispatch, useSelector } from "react-redux"
import { workspaceAsyncThunks, workspaceSelectors } from "../../../../../../../../../../features/workspace/workspaceSlice"
import { useContext, useEffect, useState } from "react"
import { FAILED, IDLE, PENDING, SUCCEEDED } from "../../../../../../../../../../constants/fetchStatus"
import Loader from "../../../../../../../../../Loader"
import Item from "../../../../../../../../../Item"
import { AliasManagementContext } from "../../../../contexts"

function AliasList({
    storyId,
    refetch = { value: 0 }
}) {
    const dispatch = useDispatch()
    const selectGetAliasesByStoryId = useSelector(workspaceSelectors.aliasSelectors.selectGetAliasesByStoryId)
    const [getAliasesByStoryIdStatus, setGetAliasesByStoryIdStatus] = useState(IDLE)
    const deleteAliasResponse = useSelector(workspaceSelectors.aliasSelectors.selectDeleteAlias)
    const [deleteAliasStatus, setDeleteAliasStatus] = useState(IDLE)
    const aliasManagementContext = useContext(AliasManagementContext)

    async function getAliasesByStoryId() {
        try {
            setGetAliasesByStoryIdStatus(PENDING)
            await dispatch(workspaceAsyncThunks.alias.getAliases({
                storyId
            })).unwrap()
            setGetAliasesByStoryIdStatus(SUCCEEDED)
        } catch (error) {
            setGetAliasesByStoryIdStatus(FAILED)
        }
    }

    async function onDeleteAliasClicked(id) {
        try {
            setDeleteAliasStatus(PENDING)
            await dispatch(workspaceAsyncThunks.alias.deleteAlias(id)).unwrap()
            setDeleteAliasStatus(SUCCEEDED)
        } catch (error) {
            setDeleteAliasStatus(FAILED)
        }
    }

    useEffect(() => {
        getAliasesByStoryId()
    }, [])

    useEffect(() => {
        if (refetch.value) {
            getAliasesByStoryId()
        }
    }, [refetch])

    useEffect(() => {
        if (deleteAliasStatus === SUCCEEDED) {
            if (deleteAliasResponse.data) {
                aliasManagementContext.setRefetchAliasList({
                    value: 1
                })
            }
        }
    }, [deleteAliasStatus])

    return (
        <div className="mt-6 relative">
            <Loader
                status={getAliasesByStoryIdStatus}
            >
                <div className="grid grid-cols-6 gap-2">
                    {selectGetAliasesByStoryId
                        && (selectGetAliasesByStoryId.map(alias => {
                            return (
                                <Item
                                    key={alias.id}
                                    content={alias.title}
                                    onRemoveClicked={() => onDeleteAliasClicked(alias.id)}
                                />
                            )
                        }))}
                </div>
            </Loader >
        </div>
    )
}

export default AliasList