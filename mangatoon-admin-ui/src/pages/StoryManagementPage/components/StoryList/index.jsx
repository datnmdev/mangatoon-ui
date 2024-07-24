import { useEffect, useState } from "react"
import Loader from "../../../../components/Loader"
import { DELETED } from "./constants"
import Table from "../../../../components/Table"
import CoverImage from "./components/CoverImage"
import StoryStatus from "./components/StoryStatus"
import moment from "moment"
import RoundButton from "../../../../components/RoundButton"
import useDeleteStory from "./hooks/useDeleteStory"
import { SUCCEEDED } from "../../../../constants/fetchStatus.constant"

const headers = [
    'Id',
    'Title',
    'Cover Image',
    'Status',
    'Created At',
    'Updated At',
    'Thao tác'
]

function StoryList({
    status,
    data,
    count,
    pagination,
    setPagination,
    setRefetch
}) {
    const [deleteStoryReqData, setDeleteStoryReqData] = useState(null)
    const { data: deleteStoryData, status: deleteStoryStatus, setSubmit: setDeleteStorySubmit } = useDeleteStory(deleteStoryReqData)

    let _data = []
    if (data) {
        _data = data.map(row => {
            return [
                row.id,
                row.title,
                (
                    <CoverImage
                        data={row}
                    />
                ),
                (
                    <StoryStatus
                        status={row.status}
                    />
                ),
                moment(row.createdAt).format('DD/MM/YYYY HH:MM:SS'),
                moment(row.updatedAt).format('DD/MM/YYYY HH:MM:SS'),
                (<div className="flex justify-center items-center space-x-1">
                    <RoundButton

                    />

                    <RoundButton
                        icon={(<i className="fa-regular fa-trash-can"></i>)}
                        color="red"
                        onClick={() => setDeleteStoryReqData({
                            id: row.id,
                            status: DELETED
                        })}
                    />
                </div>)
            ]
        })
    }

    useEffect(() => {
        if (deleteStoryReqData) {
            setDeleteStorySubmit(true)
        }
    }, [deleteStoryReqData])

    useEffect(() => {
        if (deleteStoryStatus === SUCCEEDED) {
            if (deleteStoryData.data) {
                setRefetch({
                    value: true
                })
            }
        }
    }, [deleteStoryStatus])

    return (
        <Loader status={status}>
            <Table
                headers={headers}
                data={_data}
                count={Math.ceil(count / pagination.limit)}
                page={pagination.page}
                onPaginationChanged={(e, page) => setPagination({
                    ...pagination,
                    page
                })}
            />
        </Loader>
    )
}

export default StoryList