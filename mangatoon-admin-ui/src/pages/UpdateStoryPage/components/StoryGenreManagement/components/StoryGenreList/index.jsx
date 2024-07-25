import { useEffect, useState } from "react"
import Item from "../../../../../../components/Item"
import Loader from "../../../../../../components/Loader"
import { SUCCEEDED } from "../../../../../../constants/fetchStatus.constant"
import useDeleteStoryGenre from "./hooks/useDeleteStoryGenre"
import useGetStoryGenre from "./hooks/useGetStoryGenre"

function StoryGenreList({
    storyId,
    refetch = {
        value: false
    },
    setRefetch
}) {
    const { data: storyGenreData, status: getStoryGenreStatus, setSubmit: setGetStoryGenreSubmit } = useGetStoryGenre({
        storyId,
        page: 1,
        limit: Number.MAX_SAFE_INTEGER
    })
    const [itemId, setItemId] = useState(undefined)
    const {data: deleteStoryGenreData, status: deleteStoryGenreStatus, setSubmit: setDeleteStoryGenreSubmit} = useDeleteStoryGenre(itemId)

    useEffect(() => {
        if (refetch.value) {
            setGetStoryGenreSubmit(true)
        }
    }, [refetch])

    useEffect(() => {
        if (itemId !== undefined) {
            setDeleteStoryGenreSubmit(true)
        }
    }, [itemId])

    useEffect(() => {
        if (deleteStoryGenreStatus === SUCCEEDED) {
            if (deleteStoryGenreData.data) {
                setRefetch({
                    value: true
                })
            }
        }
    }, [deleteStoryGenreStatus])

    return (
        <div className="relative">
            <Loader
                status={0}
            >
                <div className="grid grid-cols-6 gap-2">
                    {getStoryGenreStatus === SUCCEEDED
                        && (
                            storyGenreData.data.rows.map(storyGenre => {
                                return (
                                    <Item
                                        key={storyGenre.genre.id}
                                        content={storyGenre.genre.name}
                                        onRemoveClicked={() => setItemId({
                                            storyId,
                                            genreId: storyGenre.genre.id
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

export default StoryGenreList