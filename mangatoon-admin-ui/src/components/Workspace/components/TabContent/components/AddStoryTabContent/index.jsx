import { useState } from "react"
import AddStoryForm from "./components/AddStoryForm"
import AliasManagement from "./components/AliasManagement"
import AddAliasIW from "./components/AliasManagement/components/AddAliasIW"
import ChapterManagement from "./components/ChapterManagement"
import PriceManagement from "./components/PriceManagement"
import { AddAliasIWContext, AddStoryAuthorIWContext, AliasManagementContext, StoryAuthorManagementContext } from "./contexts"
import AddStoryAuthorIW from "./components/StoryAuthorManagement/components/AddStoryAuthorIW"
import StoryAuthorManagement from "./components/StoryAuthorManagement"

function AddStoryTabContent() {
    const [openAddAliasIW, setOpenAddAliasIW] = useState({
        value: false,
        key: crypto.randomUUID()
    })
    const [openAddStoryAuthorIW, setOpenAddStoryAuthorIW] = useState({
        value: false,
        key: crypto.randomUUID()
    })
    const [isCreatedStory, setCreatedStory] = useState(false)
    const [responseData, setResponseData] = useState(null)
    const [refetchAliasList, setRefetchAliasList] = useState({
        value: 0
    })
    const [refetchStoryAuthorList, setRefetchStoryAuthorList] = useState({
        value: 0
    })

    return (
        <>
            <div className="h-full flex flex-col overflow-y-auto space-y-8 px-8">
                <div>
                    <AddStoryForm
                        onCreated={value => setCreatedStory(value)}
                        onResponseData={responseData => setResponseData(responseData)}
                    />
                </div>

                {isCreatedStory
                    && (<div className="space-y-8">
                        <div>
                            <AliasManagementContext.Provider
                                value={{
                                    setOpenAddAliasIW,
                                    storyId: responseData.data.id,
                                    refetchAliasList,
                                    setRefetchAliasList
                                }}
                            >
                                <AliasManagement />
                            </AliasManagementContext.Provider>
                        </div>

                        <div>
                            <StoryAuthorManagementContext.Provider
                                value={{
                                    setOpenAddStoryAuthorIW,
                                    storyId: responseData.data.id,
                                    refetchStoryAuthorList,
                                    setRefetchStoryAuthorList
                                }}
                            >
                                <StoryAuthorManagement />
                            </StoryAuthorManagementContext.Provider>
                        </div>

                        <div>
                            <PriceManagement />
                        </div>

                        <div>
                            <ChapterManagement />
                        </div>
                    </div>)}
            </div>

            <div>
                <AddAliasIWContext.Provider
                    value={{
                        story: responseData?.data,
                        setRefetchAliasList
                    }}
                >
                    <AddAliasIW
                        key={openAddAliasIW.key}
                        isOpenWindow={openAddAliasIW.value}
                    />
                </AddAliasIWContext.Provider>

                <AddStoryAuthorIWContext.Provider
                    value={{
                        story: responseData?.data,
                        setRefetchStoryAuthorList
                    }}
                >
                    <AddStoryAuthorIW
                        key={openAddStoryAuthorIW.key}
                        isOpenWindow={openAddStoryAuthorIW.value}
                    />
                </AddStoryAuthorIWContext.Provider>
            </div>
        </>
    )
}

export default AddStoryTabContent