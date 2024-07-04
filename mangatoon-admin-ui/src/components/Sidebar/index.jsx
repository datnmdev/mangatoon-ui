import { useDispatch, useSelector } from "react-redux"
import { workspaceActions, workspaceSelectors } from "../../features/workspace/workspaceSlice"
import { ADD_STORY, AUTHOR_MANAGEMENT, DASHBOARD, GENRE_MANAGEMENT, STORY_MANAGEMENT, UPDATE_STORY } from "../Workspace/components/Tabbar/constants"
import SidebarItem from "./components/SidebarItem"
import { useState } from "react"

const data = [
    {
        icon: <i className="fa-brands fa-microsoft"></i>,
        name: 'Dashboard',
        type: [DASHBOARD],
        handleOnClicked: (dispatch) => {
            return dispatch(workspaceActions.addTab({
                name: 'Dashboard',
                type: DASHBOARD
            }))
        }
    },
    {
        icon: <i className="fa-solid fa-book"></i>,
        name: 'Quản lý truyện',
        type: [STORY_MANAGEMENT, ADD_STORY, UPDATE_STORY],
        handleOnClicked: (dispatch) => {
            return dispatch(workspaceActions.addTab({
                name: 'Quản lý truyện',
                type: STORY_MANAGEMENT
            }))
        }
    },
    {
        icon: <i className="fa-solid fa-layer-group"></i>,
        name: 'Thể loại',
        type: [GENRE_MANAGEMENT],
        handleOnClicked: (dispatch) => {
            return dispatch(workspaceActions.addTab({
                name: 'Quản lý thể loại',
                type: GENRE_MANAGEMENT
            }))
        }
    },
    {
        icon: <i className="fa-solid fa-user"></i>,
        name: 'Tác giả',
        type: [AUTHOR_MANAGEMENT],
        handleOnClicked: (dispatch) => {
            return dispatch(workspaceActions.addTab({
                name: 'Quản lý tác giả',
                type: AUTHOR_MANAGEMENT
            }))
        }
    }
]

function Sidebar() {
    const dispatch = useDispatch()
    const [items] = useState(data)
    const selectSelectedTab = useSelector(workspaceSelectors.selectSelectedTab)

    return (
        <div>
            {items.map((item, index) => {
                return (
                    <SidebarItem
                        key={index}
                        icon={item.icon}
                        name={item.name}
                        onClick={() => item.handleOnClicked(dispatch)}
                        active={selectSelectedTab && (item.type.some(type => type === selectSelectedTab.type) ? true : false)}
                    />
                )
            })}
        </div>
    )
}

export default Sidebar