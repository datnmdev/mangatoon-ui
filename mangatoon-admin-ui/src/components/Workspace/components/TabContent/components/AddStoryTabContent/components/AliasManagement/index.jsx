import { useContext } from "react"
import IconButton from "../../../../../../../IconButton"
import { AliasManagementContext } from "../../contexts"
import AliasList from "./components/AliasList"

function AliasManagement() {
    const aliasManagementContext = useContext(AliasManagementContext)

    return (
        <div>
            <div className="flex justify-between items-center">
                <div>
                    <div className="text-[1.4rem] font-[600]">Tên khác của truyện</div>
                </div>

                <div className="flex space-x-2">
                    <IconButton
                        content="Refresh"
                        onClick={() => aliasManagementContext.setRefetchAliasList({ value: 1 })}
                    />

                    <IconButton
                        icon={(<i className="fa-solid fa-plus"></i>)}
                        content="Thêm"
                        backgroundColor="rgb(33, 197, 93)"
                        onClick={() => aliasManagementContext.setOpenAddAliasIW({
                            value: true,
                            key: crypto.randomUUID()
                        })}
                    />
                </div>
            </div>

            <div>
                <AliasList
                    storyId={aliasManagementContext.storyId}
                    refetch={aliasManagementContext.refetchAliasList}
                />
            </div>
        </div>
    )
}

export default AliasManagement