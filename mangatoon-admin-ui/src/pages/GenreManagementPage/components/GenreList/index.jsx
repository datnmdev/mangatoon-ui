import { memo, useEffect, useState } from "react"
import RoundButton from "../../../../components/RoundButton"
import useDeleteGenre from "./hooks/useDeleteGenre"
import { SUCCEEDED } from "../../../../constants/fetchStatus.constant"
import Loader from "../../../../components/Loader"
import Table from "../../../../components/Table"
import UpdateGenreIW from "./components/UpdateGenreIW"

const headers = [
    'Id',
    'Name',
    'Thao tác'
]

function GenreList({
    status,
    data,
    count,
    pagination,
    setPagination,
    setRefetch
}) {
    const [deleteGenreReqData, setDeleteGenreReqData] = useState(null)
    const { data: deleteGenreData, status: deleteGenreStatus, setSubmit: setDeleteGenreSubmit } = useDeleteGenre(deleteGenreReqData)
    const [rowToUpdate, setRowToUpdate] = useState(undefined)
    const [openUpdateGenreIW, setOpenUpdateGenreIW] = useState({
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
                        onClick={() => setDeleteGenreReqData(row.id)}
                    />
                </div>
                )
            ]
        })
    }

    useEffect(() => {
        if (deleteGenreReqData) {
            setDeleteGenreSubmit(true)
        }
    }, [deleteGenreReqData])

    useEffect(() => {
        if (deleteGenreStatus === SUCCEEDED) {
            if (deleteGenreData.data) {
                setRefetch({
                    value: true
                })
            }
        }
    }, [deleteGenreStatus])

    useEffect(() => {
        if (rowToUpdate) {
            setOpenUpdateGenreIW({
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

            <UpdateGenreIW
                open={openUpdateGenreIW}
                setRefetchGenreList={setRefetch}
                genre={rowToUpdate}
            />
        </>

    )
}

export default memo(GenreList)