import IconButton from "../../../../../../../IconButton"
import { StoryAuthorManagementContext } from "../../contexts"
import StoryAuthorList from "./components/StoryAuthorList"
import { useContext } from "react"

function StoryAuthorManagement() {
    const storyAuthorManagementContext = useContext(StoryAuthorManagementContext)

    return (
        <div>
            <div className="flex justify-between items-center">
                <div>
                    <div className="text-[1.4rem] font-[600]">Tác giả của truyện</div>
                </div>

                <div className="flex space-x-2">
                    <IconButton
                        content="Refresh"
                        onClick={() => storyAuthorManagementContext.setRefetchStoryAuthorList({ value: 1 })}
                    />

                    <IconButton
                        icon={(<i className="fa-solid fa-plus"></i>)}
                        content="Thêm"
                        backgroundColor="rgb(33, 197, 93)"
                        onClick={() => storyAuthorManagementContext.setOpenAddStoryAuthorIW({
                            value: true,
                            key: crypto.randomUUID()
                        })}
                    />
                </div>
            </div>

            <div>
                <StoryAuthorList
                    storyId={storyAuthorManagementContext.storyId}
                    refetch={storyAuthorManagementContext.refetchStoryAuthorList}
                />
            </div>
        </div>
    )
}

export default StoryAuthorManagement