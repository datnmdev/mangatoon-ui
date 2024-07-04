import StoryList from "./components/StoryList"
import SearchInput from "../../../../../SearchInput"
import { useState } from "react"
import IconButton from "../../../../../IconButton"
import BasicFilter from "../../../../../BasicFilter"
import { StoryListContext } from "./contexts"
import { workspaceActions } from "../../../../../../features/workspace/workspaceSlice"
import { ADD_STORY } from "../../../Tabbar/constants"
import { useDispatch } from "react-redux"

function StoryTabContent() {
    const dispatch = useDispatch()
    const [refetch, setRefetch] = useState({
        value: 0
    })

    return (
        <div className="h-full flex flex-col">
            <div className="flex justify-between items-center">
                <div className="flex space-x-2">
                    <IconButton
                        icon={(<i className="fa-solid fa-plus"></i>)}
                        content="Thêm"
                        backgroundColor="#21C55D"
                        onClick={() => {
                            return dispatch(workspaceActions.addTab({
                                name: 'Thêm truyện',
                                type: ADD_STORY
                            }))
                        }}
                    />

                    <IconButton
                        content="Refresh"
                        onClick={() => {
                            setRefetch({
                                value: 1
                            })
                        }}
                    />
                </div>

                <div className="flex space-x-2">
                    <SearchInput />
                    <BasicFilter />
                </div>
            </div>

            <div className="relative grow overflow-y-auto mt-4">
                <StoryListContext.Provider value={{
                    setRefetchStories: setRefetch
                }}>
                    <StoryList
                        refetch={refetch}
                    />
                </StoryListContext.Provider>
            </div>
        </div>
    )
}

export default StoryTabContent