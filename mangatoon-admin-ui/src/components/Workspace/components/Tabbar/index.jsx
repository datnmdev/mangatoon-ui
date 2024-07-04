import { useDispatch, useSelector } from "react-redux"
import Tab from "./components/Tab"
import { workspaceActions, workspaceSelectors } from "../../../../features/workspace/workspaceSlice"
import { ADD_STORY, AUTHOR_MANAGEMENT, DASHBOARD, GENRE_MANAGEMENT, STORY_MANAGEMENT, UPDATE_STORY } from "./constants"
import { useEffect, useRef } from "react"

function Tabbar() {
    const selectAll = useSelector(workspaceSelectors.selectAll)
    const dispatch = useDispatch()
    const tabRefs = useRef([])

    if (tabRefs.current.length > 0) {
        tabRefs.current.splice(0, tabRefs.current.length)
    }

    function scrollToTab(index) {
        if (tabRefs.current[index]) {
            tabRefs.current[index].scrollIntoView({
                behavior: 'smooth',
                inline: 'center',
                block: 'center'
            })
        }
    }

    useEffect(() => {
        const selectedTabIndex = selectAll.tabs.findIndex(tab => tab.id === selectAll.selectedTab.id)
        scrollToTab(selectedTabIndex)
    }, [selectAll])

    return (
        <div className="flex items-center overflow-hidden hover:overflow-x-auto">
            {selectAll.tabs.map((tab, index) => {
                let favicon
                switch (tab.type) {
                    case DASHBOARD:
                        favicon = <i className="fa-brands fa-microsoft"></i>
                        break

                    case STORY_MANAGEMENT:
                    case ADD_STORY:
                    case UPDATE_STORY:
                        favicon = <i className="fa-solid fa-book"></i>
                        break

                    case GENRE_MANAGEMENT:
                        favicon = <i className="fa-solid fa-layer-group"></i>
                        break

                    case AUTHOR_MANAGEMENT:
                        favicon = <i className="fa-solid fa-user"></i>
                        break

                    default:
                        console.log('Invalid Tab');
                }
                return (
                    <div
                        key={tab.id}
                        ref={el => tabRefs.current[index] = el}
                        className="shrink-0"
                    >
                        <Tab
                            favicon={favicon}
                            active={tab.id === selectAll.selectedTab.id}
                            {...tab}
                            onClick={() => dispatch(workspaceActions.selectTab(tab))}
                            onCloseClick={(e) => {
                                e.stopPropagation()
                                dispatch(workspaceActions.removeTab(tab.id))
                            }}
                        />
                    </div>
                )
            })}
        </div>
    )
}

export default Tabbar