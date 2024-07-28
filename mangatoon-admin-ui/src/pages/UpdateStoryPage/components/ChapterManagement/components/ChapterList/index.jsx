import { memo, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import useUpdateChapter from "./hooks/useUpdateChapter"
import ChapterStatus from "./components/ChapterStatus"
import { CREATED, DELETED } from "./constants"
import RoundButton from "../../../../../../components/RoundButton"
import { SUCCEEDED } from "../../../../../../constants/fetchStatus.constant"
import Loader from "../../../../../../components/Loader"
import Table from "../../../../../../components/Table"
import moment from "moment"
import UpdateChapterIW from "./components/UpdateChapterIW"
import ChapterContentManagementIW from "./components/ChapterContentManagementIW"

const headers = [
    'Id',
    'Order',
    'Name',
    'Status',
    'Created At',
    'Updated At',
    'Thao tác'
]

function ChapterList({
    status,
    data,
    count,
    pagination,
    setPagination,
    setRefetch
}) {
    const navigate = useNavigate()
    const [updateChapterReqData, setUpdateChapterReqData] = useState(null)
    const { data: updateChapterData, status: updateChapterStatus, setSubmit: setUpdateChapterSubmit } = useUpdateChapter(updateChapterReqData)
    const [rowToUpdate, setRowToUpdate] = useState(undefined)
    const [openUpdateChapterIW, setOpenUpdateChapterIW] = useState({
        value: false
    })
    const [rowToOpenChapterContentManagementIW, setRowToOpenChapterContentManagementIW] = useState(undefined)
    const [openChapterContentManagementIW, setOpenChapterContentManagementIW] = useState({
        value: false
    })

    let _data = []
    if (data) {
        _data = data.map(row => {
            return [
                row.id,
                row.order,
                row.name,
                (
                    <ChapterStatus
                        status={row.status}
                    />
                ),
                moment(row.createdAt).format('DD/MM/YYYY HH:MM:SS'),
                moment(row.updatedAt).format('DD/MM/YYYY HH:MM:SS'),
                row.status !== DELETED
                    ? (
                        <div className="flex justify-center items-center space-x-1">
                            <RoundButton
                                onClick={() => setRowToUpdate({
                                    ...row
                                })}
                            />

                            <RoundButton
                                icon={(<i className="fa-regular fa-trash-can"></i>)}
                                color="red"
                                onClick={() => setUpdateChapterReqData({
                                    id: row.id,
                                    status: DELETED
                                })}
                            />

                            <RoundButton
                                icon={(<i className="fa-regular fa-file-lines"></i>)}
                                color="green"
                                onClick={() => setRowToOpenChapterContentManagementIW({
                                   ...row
                                })}
                            />
                        </div>
                    )
                    : (
                        <div className="flex justify-center items-center space-x-1">
                            <RoundButton
                                icon={(<img src="/imgs/redo.png" />)}
                                color="red"
                                onClick={() => setUpdateChapterReqData({
                                    id: row.id,
                                    status: CREATED
                                })}
                            />
                        </div>
                    )
            ]
        })
    }

    useEffect(() => {
        if (updateChapterReqData) {
            setUpdateChapterSubmit(true)
        }
    }, [updateChapterReqData])

    useEffect(() => {
        if (updateChapterStatus === SUCCEEDED) {
            if (updateChapterData.data) {
                setRefetch({
                    value: true
                })
            }
        }
    }, [updateChapterStatus])

    useEffect(() => {
        if (rowToUpdate) {
            setOpenUpdateChapterIW({
                value: true
            })
        }
    }, [rowToUpdate])

    useEffect(() => {
        if (rowToOpenChapterContentManagementIW) {
            setOpenChapterContentManagementIW({
                value: true
            })
        }
    }, [rowToOpenChapterContentManagementIW])

    return (
        <>
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

            <UpdateChapterIW 
                open={openUpdateChapterIW}
                setRefetchChapterList={setRefetch}
                chapter={rowToUpdate}
            />

            <ChapterContentManagementIW
                open={openChapterContentManagementIW}
                chapter={rowToOpenChapterContentManagementIW}
            />
        </>

    )
}

export default memo(ChapterList)