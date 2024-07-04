import { useEffect, useState } from "react"
import CardList from "../../../../components/CardList"
import api from "../../../../api"

function NewlyUpdatedStoryList() {
    const [stories, setStories] = useState([])
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 42,
        totalPage: 1
    })

    useEffect(() => {
        async function getStories(queries) {
            try {
                const getStoriesData = (await api.story.getStories(queries)).data.data
                setStories(getStoriesData.rows)
                setPagination({
                    ...pagination,
                    totalPage: Math.ceil(getStoriesData.count / pagination.limit)
                })
            } catch (error) {
                
            }
        }

        getStories({
            page: pagination.page,
            limit: pagination.limit
        })
    }, [pagination.page])

    return (
        <CardList 
            data={stories}
            totalPage={pagination.totalPage}
            page={pagination.page}
            onChange={(e, value) => setPagination({
                ...pagination,
                page: value
            })}
        />
    )
}

export default NewlyUpdatedStoryList