import { useEffect, useState } from "react"
import Item from "../../../../../../components/Item"
import Loader from "../../../../../../components/Loader"
import { SUCCEEDED } from "../../../../../../constants/fetchStatus.constant"
import useGetStoryAuthor from "./hooks/useGetStoryAuthor"
import useDeleteStoryAuthor from "./hooks/useDeleteStoryAuthor"

function StoryAuthorList({
    storyId,
    refetch = {
        value: false
    },
    setRefetch
}) {
    const { data: storyAuthorData, status: getStoryAuthorStatus, setSubmit: setGetStoryAuthorSubmit } = useGetStoryAuthor({
        storyId,
        page: 1,
        limit: Number.MAX_SAFE_INTEGER
    })
    const [itemId, setItemId] = useState(undefined)
    const {data: deleteStoryAuthorData, status: deleteStoryAuthorStatus, setSubmit: setDeleteStoryAuthorSubmit} = useDeleteStoryAuthor(itemId)

    useEffect(() => {
        if (refetch.value) {
            setGetStoryAuthorSubmit(true)
        }
    }, [refetch])

    useEffect(() => {
        if (itemId !== undefined) {
            setDeleteStoryAuthorSubmit(true)
        }
    }, [itemId])

    useEffect(() => {
        if (deleteStoryAuthorStatus === SUCCEEDED) {
            if (deleteStoryAuthorData.data) {
                setRefetch({
                    value: true
                })
            }
        }
    }, [deleteStoryAuthorStatus])

    return (
        <div className="relative">
            <Loader
                status={0}
            >
                <div className="grid grid-cols-6 gap-2">
                    {getStoryAuthorStatus === SUCCEEDED
                        && (
                            storyAuthorData.data.rows.map(storyAuthor => {
                                return (
                                    <Item
                                        key={storyAuthor.author.id}
                                        content={storyAuthor.author.name}
                                        onRemoveClicked={() => setItemId({
                                            storyId,
                                            authorId: storyAuthor.author.id
                                        })}
                                    />
                                )
                            })
                        )}
                </div>
            </Loader>
        </div>
    )
}

export default StoryAuthorList