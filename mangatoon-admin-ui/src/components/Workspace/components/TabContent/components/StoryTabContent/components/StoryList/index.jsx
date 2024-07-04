import { useDispatch, useSelector } from "react-redux"
import Table from "../../../../../../../Table"
import { workspaceActions, workspaceAsyncThunks, workspaceSelectors } from "../../../../../../../../features/workspace/workspaceSlice"
import { useContext, useEffect, useState } from "react"
import { FAILED, IDLE, PENDING, SUCCEEDED } from "../../../../../../../../constants/fetchStatus"
import Loader from "../../../../../../../Loader"
import RoundButton from "../../../../../../../RoundButton"
import StoryStatus from "./components/StoryStatus"
import { DELETED, FINISHED, IN_PROGRESS, SUSPENDED, UNPUBLISHED, statusContent } from "./constants"
import { StoryListContext } from "../../contexts"
import moment from "moment"

const headers = [
    'Id',
    'Title',
    'Cover Image',
    'Status',
    'Created At',
    'Updated At',
    'Thao tác'
]

function StoryList({ refetch = { value: 0 } }) {
    const selectedTab = useSelector(workspaceSelectors.selectSelectedTab)
    const selectStories = useSelector(workspaceSelectors.storySelectors.selectStories)
    const dispatch = useDispatch()
    const [status, setStatus] = useState(IDLE)
    const [limit] = useState(10)
    const selectStoryPage = useSelector(workspaceSelectors.storySelectors.selectStoryPage)
    const [page, setPage] = useState(selectStoryPage ? selectStoryPage : 1)
    const [deleteStoryStatus, setDeleteStoryStatus] = useState(IDLE)
    const deleteStoryResponse = useSelector(workspaceSelectors.storySelectors.selectUpdateStory)
    const storyListContext = useContext(StoryListContext)

    async function getStories(tabId) {
        try {
            setStatus(PENDING)
            await dispatch(workspaceAsyncThunks.story.getStories({
                status: `${UNPUBLISHED},${IN_PROGRESS},${SUSPENDED},${FINISHED}`,
                page,
                limit
            })).unwrap()
            setStatus(SUCCEEDED)
        } catch (error) {
            setStatus(FAILED)
        }
    }

     function onDeleteStoryClickedGenerator(storyId) {
        return async (e) => {
            try {
                setDeleteStoryStatus(PENDING)
                await dispatch(workspaceAsyncThunks.story.updateStory({
                    id: storyId,
                    status: DELETED
                })).unwrap()
                setDeleteStoryStatus(SUCCEEDED)
            } catch (error) {
                setDeleteStoryStatus(FAILED)
            }
        }
    }

    let storyElements

    if (selectStories) {
        storyElements = selectStories.stories
            .map(story => {
                return ([
                    story.id,
                    story.title,
                    (<div className="flex justify-center">
                        <img
                            className="w-[64px]"
                            src={story.coverImageUrl}
                            alt={`${story.title}`}
                        />
                    </div>),
                    (<StoryStatus
                        status={story.status}
                        content={statusContent[story.status]}
                    />),
                    moment(story.createdAt).format('DD/MM/YYYY HH:mm:ss'),
                    moment(story.updatedAt).format('DD/MM/YYYY HH:mm:ss'),
                    (<div className="flex justify-center items-center space-x-1">
                        <RoundButton
                            icon={(<i className="fa-solid fa-eye"></i>)}
                            color="green"
                        />

                        <RoundButton

                        />

                        {story.status !== DELETED
                            && (
                                <RoundButton
                                    icon={(<i className="fa-regular fa-trash-can"></i>)}
                                    color="red"
                                    onClick={onDeleteStoryClickedGenerator(story.id)}
                                />
                            )}
                    </div>)
                ])
            })
    }

    useEffect(() => {
        if (!selectStories) {
            getStories(selectedTab.id)
        }
    }, [])

    useEffect(() => {
        if (refetch.value) {
            getStories(selectedTab.id)
        }
    }, [refetch])

    useEffect(() => {
        if (page > 1 && Math.ceil(selectStories.count / limit) < page) {
            setPage(page - 1)
        }
    }, [selectStories])

    useEffect(() => {
        dispatch(workspaceActions.saveStoryPage(page))
        getStories(selectedTab.id)
    }, [page])

    useEffect(() => {
        if (deleteStoryStatus === SUCCEEDED && deleteStoryResponse) {
            storyListContext.setRefetchStories({
                value: 1
            })

        }
    }, [deleteStoryStatus])

    return (
        <Loader status={status}>
            {selectStories
                && (
                    <Table
                        headers={headers}
                        data={storyElements}
                        count={Math.ceil(selectStories.count / limit)}
                        page={page}
                        onPaginationChanged={(e, value) => setPage(value)}
                    />
                )}
        </Loader>
    )
}

export default StoryList