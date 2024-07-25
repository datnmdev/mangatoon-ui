import { memo, useState } from "react"
import IconButton from "../../../../components/IconButton"
import AliasList from "./components/AliasList"
import AddAliasIW from "./components/AddAliasIW"

function AliasManagement({
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
                        <div className="text-[1.4rem] font-[600]">Tên Khác Của Truyện</div>
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
                    <AliasList
                        storyId={storyId}
                        refetch={refetch}
                        setRefetch={setRefetch}
                    />
                </div>
            </div>

            <AddAliasIW 
                open={open}
                storyId={storyId}
                setRefetchAliasList={setRefetch}
            />
        </>
    )
}

export default  memo(AliasManagement)