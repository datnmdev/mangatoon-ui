import { memo, useState } from "react"
import IconButton from "../../../../components/IconButton"
import StoryGenreList from "./components/StoryGenreList"
import AddStoryGenreIW from "./components/AddStoryGenreIW"

function StoryGenreManagement({
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
                        <div className="text-[1.4rem] font-[600]">Thể Loại Của Truyện</div>
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
                    <StoryGenreList
                        storyId={storyId}
                        refetch={refetch}
                        setRefetch={setRefetch}
                    />
                </div>
            </div>

            <AddStoryGenreIW 
                open={open}
                storyId={storyId}
                setRefetchStoryGenreList={setRefetch}
            />
        </>
    )
}

export default  memo(StoryGenreManagement)