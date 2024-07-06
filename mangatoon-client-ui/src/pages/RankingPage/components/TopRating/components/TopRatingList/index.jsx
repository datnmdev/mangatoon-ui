import { useEffect } from "react"
import TopList from "../../../../../../components/TopList"
import useTopRatingList from "./hooks/useTopRatingList"
import { PENDING } from "../../../../../../constants/fetchStatus.constant"

function TopRatingList() {
    const { data: topRatingListData, status: topRatingListStatus, setSubmit: setTopRatingListSubmit } = useTopRatingList({
        page: 1,
        limit: 10
    })

    useEffect(() => {
        setTopRatingListSubmit(true)
    }, [])

    if (topRatingListStatus === PENDING || !topRatingListData?.data) {
        return (
            <div>
                Loading...
            </div>
        )
    }

    return (
        <TopList 
            data={topRatingListData.data}
        />
    )
}

export default TopRatingList