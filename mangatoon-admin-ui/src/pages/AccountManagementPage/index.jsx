import { memo, useEffect, useState } from "react"
import IconButton from "../../components/IconButton"
import SearchInput from "../../components/SearchInput"
import { ACTIVATED } from "../SignInPage/constants/accountStatus.constant"
import useSearchAccount from "./hooks/useSearchAccount"
import AccountList from "./components/AccountList"
import Filter from "../../components/Filter"
import { CHECKBOX } from "../../components/Filter/components/constants"
import { ADMIN, DELETED, LOCKED, UNACTIVATED, USER } from "./constants"

function AccountManagementPage() {
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 20
    })
    const [queries, setQueries] = useState({
        keyword: '',
        status: `${ACTIVATED}`,
        role: `${ADMIN},${USER}`,
        ...pagination
    })
    const { data, status, setSubmit } = useSearchAccount(queries)
    const [refetch, setRefetch] = useState({
        value: false
    })

    useEffect(() => {
        if (refetch.value) {
            setSubmit(true)
        }
    }, [refetch])

    useEffect(() => {
        setQueries({
            ...queries,
            ...pagination
        })
    }, [pagination.page])

    useEffect(() => {
        setSubmit(true)
    }, [queries])

    return (
        <>
            <div className="space-y-2 bg-white p-4">
                <div className="flex justify-between items-center">
                    <div>
                        <div className="text-[1.4rem] font-[600]">Quản Lý Tài Khoản</div>
                    </div>
                </div>

                <div className="h-full flex flex-col min-h-[100vh]">
                    <div className="flex justify-between items-center">
                        <div className="flex space-x-2">
                            <IconButton
                                content="Refresh"
                                onClick={() => setRefetch({
                                    value: true
                                })}
                            />
                        </div>

                        <div className="flex space-x-2">
                            <SearchInput
                                placeholder='Tìm kiếm bằng id người dùng, tên tài khoản...'
                                onChange={(e) => setQueries({
                                    ...queries,
                                    keyword: e.target.value
                                })}
                            />

                            <Filter
                                data={[
                                    {
                                        type: CHECKBOX,
                                        name: 'Trạng thái',
                                        group: 'status',
                                        valueType: 'number',
                                        options: [
                                            {
                                                title: 'unactivated',
                                                value: UNACTIVATED
                                            },
                                            {
                                                title: 'activated',
                                                value: ACTIVATED
                                            },
                                            {
                                                title: 'locked',
                                                value: LOCKED
                                            },
                                            {
                                                title: 'deleted',
                                                value: DELETED
                                            }
                                        ]
                                    },
                                    {
                                        type: CHECKBOX,
                                        name: 'Quyền',
                                        group: 'role',
                                        valueType: 'string',
                                        options: [
                                            {
                                                title: 'admin',
                                                value: ADMIN
                                            },
                                            {
                                                title: 'user',
                                                value: USER
                                            }
                                        ]
                                    },
                                ]}
                                onChange={value => {
                                    if (value?.status) {
                                        if (value.status?.length === 0) {
                                            setQueries({
                                                ...queries,
                                                status: `${ACTIVATED}`
                                            })
                                        } else {
                                            setQueries({
                                                ...queries,
                                                status: value.status.join(',')
                                            })
                                        }
                                    }

                                    if (value?.role) {
                                        if (value.role?.length === 0) {
                                            setQueries(prev => ({
                                                ...prev,
                                                role: `${ADMIN},${USER}`
                                            }))
                                        } else {
                                            setQueries(prev => ({
                                                ...prev,
                                                role: value.role.join(',')
                                            }))
                                        }
                                    }
                                }}
                            />
                        </div>
                    </div>

                    <div className="relative grow overflow-y-auto mt-2">
                        <AccountList
                            status={status}
                            data={data?.data?.rows}
                            count={data?.data?.count}
                            pagination={pagination}
                            setPagination={setPagination}
                            setRefetch={setRefetch}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default memo(AccountManagementPage)