import { useSelector } from "react-redux"
import Tabbar from "./components/Tabbar"
import { workspaceSelectors } from "../../features/workspace/workspaceSlice"
import EmptyWorkspace from "../EmptyWorkspace"
import TabContent from "./components/TabContent"

function Workspace() {
    const selectedTab = useSelector(workspaceSelectors.selectSelectedTab)

    if (!selectedTab) {
        return (
            <EmptyWorkspace />
        )
    }

    return (
        <div className="h-full flex flex-col">
            <div className="shrink-0 py-2">
                <Tabbar />
            </div>

            <div className="grow overflow-hidden mt-4">
                <TabContent />
            </div>
        </div>
    )
}

export default Workspace