import { useDispatch, useSelector } from "react-redux"
import { workspaceAsyncThunks, workspaceSelectors } from "../../../../../../../../../../features/workspace/workspaceSlice"
import { FAILED, IDLE, PENDING, SUCCEEDED } from "../../../../../../../../../../constants/fetchStatus"
import { useContext, useEffect, useState } from "react"
import { StoryAuthorManagementContext } from "../../../../contexts"
import Loader from "../../../../../../../../../Loader"
import Item from "../../../../../../../../../Item"

function StoryAuthorList({
    storyId,
    refetch = { value: 0 }
}) {
    const dispatch = useDispatch()
    const selectGetStoryAuthorByStoryId = useSelector(workspaceSelectors.storyAuthorSelectors.selectGetStoryAuthorByStoryId)
    const [getStoryAuthorByStoryIdStatus, setGetStoryAuthorByStoryIdStatus] = useState(IDLE)
    const deleteStoryAuthorResponse = useSelector(workspaceSelectors.storyAuthorSelectors.selectDeleteStoryAuthor)
    const [deleteStoryAuthorStatus, setDeleteStoryAuthorStatus] = useState(IDLE)
    const storyAuthorManagementContext = useContext(StoryAuthorManagementContext)

    async function getStoryAuthorByStoryId() {
        try {
            setGetStoryAuthorByStoryIdStatus(PENDING)
            await dispatch(workspaceAsyncThunks.storyAuthor.getStoryAuthors({
                storyId
            })).unwrap()
            setGetStoryAuthorByStoryIdStatus(SUCCEEDED)
        } catch (error) {
            setGetStoryAuthorByStoryIdStatus(FAILED)
        }
    }

    async function onDeleteStoryAuthorClicked(data) {
        try {
            setDeleteStoryAuthorStatus(PENDING)
            await dispatch(workspaceAsyncThunks.storyAuthor.deleteStoryAuthor(data)).unwrap()
            setDeleteStoryAuthorStatus(SUCCEEDED)
        } catch (error) {
            setDeleteStoryAuthorStatus(FAILED)
        }
    }

    useEffect(() => {
        getStoryAuthorByStoryId()
    }, [])

    useEffect(() => {
        if (refetch.value) {
            getStoryAuthorByStoryId()
        }
    }, [refetch])

    useEffect(() => {
        if (deleteStoryAuthorStatus === SUCCEEDED) {
            if (deleteStoryAuthorResponse.data) {
                storyAuthorManagementContext.setRefetchStoryAuthorList({
                    value: 1
                })
            }
        }
    }, [deleteStoryAuthorStatus])

    return (
        <div className="mt-6 relative">
            <Loader
                status={getStoryAuthorByStoryIdStatus}
            >
                <div className="grid grid-cols-6 gap-2">
                    {selectGetStoryAuthorByStoryId
                        && (selectGetStoryAuthorByStoryId.map(storyAuthor => {
                            return (
                                <Item
                                    key={storyAuthor.author.id}
                                    content={storyAuthor.author.name}
                                    onRemoveClicked={() => onDeleteStoryAuthorClicked({ authorId: storyAuthor.author.id, storyId: storyAuthor.story.id })}
                                />
                            )
                        }))}
                </div>
            </Loader >
        </div>
    )
}

export default StoryAuthorList