import { memo, useEffect, useState } from "react"
import RoundButton from "../../../../components/RoundButton"
import { SUCCEEDED } from "../../../../constants/fetchStatus.constant"
import Loader from "../../../../components/Loader"
import Table from "../../../../components/Table"
import AccountStatus from "./components/AccountStatus"
import moment from "moment"
import { ACTIVATED, DELETED } from "../../constants"
import UpdateAccountIW from "./components/UpdateAccountIW"
import useUpdateAccount from "./hooks/useUpdateAccount"

const headers = [
    'Account Id',
    'Name',
    'Status',
    'Role',
    'Provider',
    'CreatedAt',
    'User Id',
    'Thao tác'
]

function AccountList({
    status,
    data,
    count,
    pagination,
    setPagination,
    setRefetch
}) {
    const [updateAccountReqData, setUpdateAccountReqData] = useState(null)
    const { data: updateAccountData, status: updateAccountStatus, setSubmit: setUpdateAccountSubmit } = useUpdateAccount(updateAccountReqData)
    const [rowToUpdate, setRowToUpdate] = useState(undefined)
    const [openUpdateAccountIW, setOpenUpdateAccountIW] = useState({
        value: false
    })

    let _data = []
    if (data) {
        _data = data.map(row => {
            return [
                row.id,
                row.user.name,
                (
                    <AccountStatus
                        status={row.status}
                    />
                ),
                row.role,
                row.provider,
                moment(row.createdAt).format('DD/MM/YYYY HH:MM:SS'),
                row.userId,
                (
                    row.status !== DELETED
                        ? (
                            <div className="flex justify-center items-center space-x-1">
                                <RoundButton
                                    onClick={() => setRowToUpdate(row)}
                                />

                                <RoundButton
                                    icon={(<i className="fa-regular fa-trash-can"></i>)}
                                    color="red"
                                    onClick={() => setUpdateAccountReqData({
                                        id: row.id,
                                        status: DELETED
                                    })}
                                />
                            </div>
                        )
                        : (
                            <div className="flex justify-center items-center space-x-1">
                                <RoundButton
                                    icon={(<img src="/imgs/redo.png" />)}
                                    color="red"
                                    onClick={() => setUpdateAccountReqData({
                                        id: row.id,
                                        status: ACTIVATED
                                    })}
                                />
                            </div>
                        )
                )
            ]
        })
    }

    useEffect(() => {
        if (updateAccountReqData) {
            setUpdateAccountSubmit(true)
        }
    }, [updateAccountReqData])

    useEffect(() => {
        if (updateAccountStatus === SUCCEEDED) {
            if (updateAccountData.data) {
                setRefetch({
                    value: true
                })
            }
        }
    }, [updateAccountStatus])

    useEffect(() => {
        if (rowToUpdate) {
            setOpenUpdateAccountIW({
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

            <UpdateAccountIW
                open={openUpdateAccountIW}
                setRefetchAccountList={setRefetch}
                account={rowToUpdate}
            />
        </>

    )
}

export default memo(AccountList)