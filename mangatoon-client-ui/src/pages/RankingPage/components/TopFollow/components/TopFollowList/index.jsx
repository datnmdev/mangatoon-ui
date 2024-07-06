import { useEffect } from "react"
import TopList from "../../../../../../components/TopList"
import { PENDING } from "../../../../../../constants/fetchStatus.constant"
import useTopFollowList from "./hooks/useTopFollowList"

function TopFollowList() {
    const { data: topFollowListData, status: topFollowListStatus, setSubmit: setTopFollowListSubmit } = useTopFollowList({
        page: 1,
        limit: 10
    })

    useEffect(() => {
        setTopFollowListSubmit(true)
    }, [])

    if (topFollowListStatus === PENDING || !topFollowListData?.data) {
        return (
            <div>
                Loading...
            </div>
        )
    }

    return (
        <TopList 
            data={topFollowListData.data}
        />
    )
}

export default TopFollowList