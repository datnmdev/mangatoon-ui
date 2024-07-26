import { memo, useEffect, useState } from "react"
import RoundButton from "../../../../components/RoundButton"
import { SUCCEEDED } from "../../../../constants/fetchStatus.constant"
import Loader from "../../../../components/Loader"
import Table from "../../../../components/Table"
import UpdateAuthorIW from "./components/UpdateAuthorIW"
import useDeleteAuthor from "./hooks/useDeleteAuthor"

const headers = [
    'Id',
    'Name',
    'Thao tác'
]

function AuthorList({
    status,
    data,
    count,
    pagination,
    setPagination,
    setRefetch
}) {
    const [deleteAuthorReqData, setDeleteAuthorReqData] = useState(null)
    const { data: deleteAuthorData, status: deleteAuthorStatus, setSubmit: setDeleteAuthorSubmit } = useDeleteAuthor(deleteAuthorReqData)
    const [rowToUpdate, setRowToUpdate] = useState(undefined)
    const [openUpdateAuthorIW, setOpenUpdateAuthorIW] = useState({
        value: false
    })

    let _data = []
    if (data) {
        _data = data.map(row => {
            return [
                row.id,
                row.name,
                (
                <div className="flex justify-center items-center space-x-1">
                    <RoundButton
                        onClick={() => setRowToUpdate({
                            ...row
                        })}
                    />

                    <RoundButton
                        icon={(<i className="fa-regular fa-trash-can"></i>)}
                        color="red"
                        onClick={() => setDeleteAuthorReqData(row.id)}
                    />
                </div>
                )
            ]
        })
    }

    useEffect(() => {
        if (deleteAuthorReqData) {
            setDeleteAuthorSubmit(true)
        }
    }, [deleteAuthorReqData])

    useEffect(() => {
        if (deleteAuthorStatus === SUCCEEDED) {
            if (deleteAuthorData.data) {
                setRefetch({
                    value: true
                })
            }
        }
    }, [deleteAuthorStatus])

    useEffect(() => {
        if (rowToUpdate) {
            setOpenUpdateAuthorIW({
                value: true
            })
        }
    }, [rowToUpdate])

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

            <UpdateAuthorIW
                open={openUpdateAuthorIW}
                setRefetchAuthorList={setRefetch}
                author={rowToUpdate}
            />
        </>

    )
}

export default memo(AuthorList)