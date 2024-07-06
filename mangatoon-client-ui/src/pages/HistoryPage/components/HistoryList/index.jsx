import { useEffect, useState } from "react"
import useGetHistories from "./hooks/useGetHistories"
import { PENDING, SUCCEEDED } from "../../../../constants/fetchStatus.constant"
import { Pagination } from "@mui/material"
import HistoryItem from "../HistoryItem"
import Empty from "../../../../components/Empty"

function HistoryList({
    refetch,
    setRefetch
}) {
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 16
    })
    const { data: getHistoriesData, status: getHistoriesStatus, setSubmit: setGetHistoriesSubmit } = useGetHistories(pagination)

    useEffect(() => {
        setGetHistoriesSubmit(true)
    }, [pagination.page])

    useEffect(() => {
        if (getHistoriesStatus === SUCCEEDED) {
            if (getHistoriesData.data) {
                if (getHistoriesData.data.rows.length === 0 && pagination.page > 1) {
                    setPagination({
                        ...pagination,
                        page: pagination.page - 1
                    })
                }
            }
        }
    }, [getHistoriesStatus])

    useEffect(() => {
        if (refetch.value) {
            setGetHistoriesSubmit(true)
        }
    }, [refetch])

    if (getHistoriesStatus === PENDING || !getHistoriesData?.data) {
        return (
            <div>
                Loading...
            </div>
        )
    } else {
        if (getHistoriesData.data.rows.length === 0) {
            return (
                <Empty />
            )
        }
    }

    return (
        <div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-1 sm:gap-0">
                {getHistoriesData.data.rows.map(row => {
                    return (
                        <HistoryItem 
                            key={row.id}
                            data={row}
                            setRefetchHistoryList={setRefetch}
                        />
                    )
                })}
            </div>

            <div className="flex justify-center items-center mt-8">
                <Pagination 
                    size="large"
                    page={pagination.page}
                    count={Math.ceil(getHistoriesData.data.count / pagination.limit)}
                    onChange={(e, page) => setPagination({
                        ...pagination,
                        page
                    })}
                />
            </div>
        </div>
    )
}

export default HistoryList