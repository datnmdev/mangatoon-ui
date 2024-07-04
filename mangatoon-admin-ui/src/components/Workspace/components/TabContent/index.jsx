import { useSelector } from "react-redux"
import { workspaceSelectors } from "../../../../features/workspace/workspaceSlice"
import GenreTabContent from "./components/GenreTabContent"
import { ADD_STORY, AUTHOR_MANAGEMENT, GENRE_MANAGEMENT, STORY_MANAGEMENT } from "../Tabbar/constants"
import AuthorTabContent from "./components/AuthorTabContent"
import StoryTabContent from "./components/StoryTabContent"
import AddStoryTabContent from "./components/AddStoryTabContent"

function TabContent() {
    const selectedTab = useSelector(workspaceSelectors.selectSelectedTab)

    return (
        <div className="h-full overflow-hidden">
            {selectedTab.type === GENRE_MANAGEMENT && <GenreTabContent key={selectedTab.id} />}
            {selectedTab.type === AUTHOR_MANAGEMENT && <AuthorTabContent key={selectedTab.id} />}
            {selectedTab.type === STORY_MANAGEMENT && <StoryTabContent key={selectedTab.id} />}
            {selectedTab.type === ADD_STORY && <AddStoryTabContent key={selectedTab.id} />}
        </div>
    )
}

export default TabContent