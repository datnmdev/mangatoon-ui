import { useEffect, useState } from "react"
import Item from "../../../../../../components/Item"
import Loader from "../../../../../../components/Loader"
import useGetAliasByStoryId from "./hooks/useGetAliasByStoryId"
import { SUCCEEDED } from "../../../../../../constants/fetchStatus.constant"
import useDeleteAliasById from "./hooks/useDeleteAliasById"

function AliasList({
    storyId,
    refetch = {
        value: false
    },
    setRefetch
}) {
    const { data: aliasesData, status: getAliasByStoryIdStatus, setSubmit: setGetAliasByStoryIdSubmit } = useGetAliasByStoryId(storyId)
    const [itemId, setItemId] = useState(undefined)
    const {data: deleteAliasData, status: deleteAliasStatus, setSubmit: setDeleteAliasSubmit} = useDeleteAliasById(itemId)

    useEffect(() => {
        if (refetch.value) {
            setGetAliasByStoryIdSubmit(true)
        }
    }, [refetch])

    useEffect(() => {
        if (itemId !== undefined) {
            setDeleteAliasSubmit(true)
        }
    }, [itemId])

    useEffect(() => {
        if (deleteAliasStatus === SUCCEEDED) {
            if (deleteAliasData.data) {
                setRefetch({
                    value: true
                })
            }
        }
    }, [deleteAliasStatus])

    return (
        <div className="relative">
            <Loader
                status={0}
            >
                <div className="grid grid-cols-6 gap-2">
                    {getAliasByStoryIdStatus === SUCCEEDED
                        && (
                            aliasesData.data.map(alias => {
                                return (
                                    <Item
                                        key={alias.id}
                                        content={alias.title}
                                        onRemoveClicked={() => setItemId(alias.id)}
                                    />
                                )
                            })
                        )}
                </div>
            </Loader>
        </div>
    )
}

export default AliasList