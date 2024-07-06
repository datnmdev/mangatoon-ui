import { useEffect, useState } from "react"
import Button from "../../../../../../components/Button"
import useGetTopViewList from "./hooks/useGetTopViewList"
import { PENDING } from "../../../../../../constants/fetchStatus.constant"
import TopList from "../../../../../../components/TopList"

function TopWeekList() {
    const [queries, setQueries] = useState({
        from: new Date(0),
        to: new Date(),
        page: 1,
        limit: 10
    })
    const { data: getTopViewListData, status: getTopViewListStatus, setSubmit: setGetTopViewListsSubmit } = useGetTopViewList(queries)

    useEffect(() => {
        setGetTopViewListsSubmit(true)
    }, [queries])

    return (
        <div className='mt-4 space-y-4 rounded-[4px] overflow-hidden'>
            <ul className='grid grid-cols-4 text-center'>
                <Button
                    backgroundColor={queries.limit === 10 ? "#F08121" : "#ccc"}
                    sx={{
                        fontSize: '1.2rem',
                        fontWeight: '600',
                        borderRadius: 0
                    }}
                    onClick={() => setQueries({
                        ...queries,
                        limit: 10
                    })}
                >
                    TOP 10
                </Button>

                <Button
                    backgroundColor={queries.limit === 20 ? "#F08121" : "#ccc"}
                    sx={{
                        fontSize: '1.2rem',
                        fontWeight: '600',
                        borderRadius: 0
                    }}
                    onClick={() => setQueries({
                        ...queries,
                        limit: 20
                    })}
                >
                    TOP 20
                </Button>

                <Button
                    backgroundColor={queries.limit === 50 ? "#F08121" : "#ccc"}
                    sx={{
                        fontSize: '1.2rem',
                        fontWeight: '600',
                        borderRadius: 0
                    }}
                    onClick={() => setQueries({
                        ...queries,
                        limit: 50
                    })}
                >
                    TOP 50
                </Button>

                <Button
                    backgroundColor={queries.limit === 100 ? "#F08121" : "#ccc"}
                    sx={{
                        fontSize: '1.2rem',
                        fontWeight: '600',
                        borderRadius: 0
                    }}
                    onClick={() => setQueries({
                        ...queries,
                        limit: 100
                    })}
                >
                    TOP 100
                </Button>
            </ul>

            {getTopViewListStatus === PENDING || !getTopViewListData?.data
                ? (
                    <div>Loading...</div>
                )
                : (
                    <TopList
                        data={getTopViewListData.data}
                    />
                )}
        </div>
    )
}

export default TopWeekList