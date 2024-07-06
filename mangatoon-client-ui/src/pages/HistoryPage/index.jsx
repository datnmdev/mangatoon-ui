import { useEffect, useState } from "react"
import Topic from "../../components/Topic"
import HistoryList from "./components/HistoryList"
import Button from "../../components/Button"
import useDeleteAllHistoryDetail from "./hooks/useDeleteAllHistoryDetail"
import { PENDING, SUCCEEDED } from "../../constants/fetchStatus.constant"

function HistoryPage() {
    const [refetch, setRefetch] = useState({
        value: false
    })
    const { data: deleteAllHistoryDetailData, status: deleteAllHistoryDetailStatus, setSubmit: setDeleteAllHistoryDetailSubmit } = useDeleteAllHistoryDetail()

    useEffect(() => {
        if (deleteAllHistoryDetailStatus === SUCCEEDED) {
            if (deleteAllHistoryDetailData.data) {
                setRefetch({
                    value: true
                })
            }
        }
    }, [deleteAllHistoryDetailStatus])

    return (
        <div className="my-8 sm:px-2">
            <div className="container mx-auto">
                <Topic
                    name={(
                        <div className="flex justify-between items-center">
                            <div className="space-x-2">
                                <span>
                                    <i className="fa-regular fa-rectangle-list"></i>
                                </span>
                                <span>Lịch sử đọc truyện</span>
                            </div>

                            <div>
                                <Button
                                    backgroundColor="red"
                                    sx={{
                                        fontSize: '1rem'
                                    }}
                                    disabled={deleteAllHistoryDetailStatus === PENDING}
                                    onClick={() => setDeleteAllHistoryDetailSubmit(true)}
                                >
                                    {deleteAllHistoryDetailStatus === PENDING ? 'Đang xoá...' : 'Xoá tất cả'}
                                </Button>
                            </div>
                        </div>
                    )}
                >
                    <HistoryList
                        refetch={refetch}
                        setRefetch={setRefetch}
                    />
                </Topic>
            </div>
        </div>
    )
}

export default HistoryPage