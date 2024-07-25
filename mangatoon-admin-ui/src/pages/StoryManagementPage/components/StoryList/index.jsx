import { useEffect, useState } from "react"
import Loader from "../../../../components/Loader"
import { DELETED, UNPUBLISHED } from "./constants"
import Table from "../../../../components/Table"
import CoverImage from "./components/CoverImage"
import StoryStatus from "./components/StoryStatus"
import moment from "moment"
import RoundButton from "../../../../components/RoundButton"
import { SUCCEEDED } from "../../../../constants/fetchStatus.constant"
import { useNavigate } from "react-router-dom"
import path from "../../../../routers/path"
import useUpdateStory from "./hooks/useUpdateStory"

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
    const navigate = useNavigate()
    const [updateStoryReqData, setUpdateStoryReqData] = useState(null)
    const { data: updateStoryData, status: updateStoryStatus, setSubmit: setUpdateStorySubmit } = useUpdateStory(updateStoryReqData)

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
                row.status !== DELETED
                ? (
                    <div className="flex justify-center items-center space-x-1">
                        <RoundButton
                            onClick={() => navigate(path.updateStoryPage(row.id))}
                        />

                        <RoundButton
                            icon={(<i className="fa-regular fa-trash-can"></i>)}
                            color="red"
                            onClick={() => setUpdateStoryReqData({
                                id: row.id,
                                status: DELETED
                            })}
                        />
                    </div>
                )
                : (
                    <div className="flex justify-center items-center space-x-1">
                        <RoundButton
                            icon={(<img src="/imgs/redo.png"/>)}
                            color="red"
                            onClick={() => setUpdateStoryReqData({
                                id: row.id,
                                status: UNPUBLISHED
                            })}
                        />
                    </div>
                )
            ]
        })
    }

    useEffect(() => {
        if (updateStoryReqData) {
            setUpdateStorySubmit(true)
        }
    }, [updateStoryReqData])

    useEffect(() => {
        if (updateStoryStatus === SUCCEEDED) {
            if (updateStoryData.data) {
                setRefetch({
                    value: true
                })
            }
        }
    }, [updateStoryStatus])

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