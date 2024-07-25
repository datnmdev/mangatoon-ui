import { memo, useState } from "react"
import IconButton from "../../../../components/IconButton"
import StoryAuthorList from "./components/StoryAuthorList"
import AddStoryAuthorIW from "./components/AddStoryAuthorIW"

function StoryAuthorManagement({
    storyId
}) {
    const [refetch, setRefetch] = useState({
        value: true
    })
    const [open, setOpen] = useState({
        value: false
    })

    return (
        <>
            <div className="space-y-2">
                <div className="flex justify-between items-center">
                    <div>
                        <div className="text-[1.4rem] font-[600]">Tác Giả Của Truyện</div>
                    </div>

                    <div className="flex space-x-2">
                        <IconButton
                            content="Refresh"
                            onClick={() => setRefetch({
                                value: true
                            })}
                        />

                        <IconButton
                            icon={(<i className="fa-solid fa-plus"></i>)}
                            content="Thêm"
                            backgroundColor="rgb(33, 197, 93)"
                            onClick={() => setOpen({
                                value: open
                            })}
                        />
                    </div>
                </div>

                <div>
                    <StoryAuthorList
                        storyId={storyId}
                        refetch={refetch}
                        setRefetch={setRefetch}
                    />
                </div>
            </div>

            <AddStoryAuthorIW 
                open={open}
                storyId={storyId}
                setRefetchStoryAuthorList={setRefetch}
            />
        </>
    )
}

export default  memo(StoryAuthorManagement)