import { memo, useEffect, useState } from "react"
import IconButton from "../../components/IconButton"
import SearchInput from "../../components/SearchInput"
import AddAuthorIW from "./components/AuthorList/components/AddAuthorIW"
import useSearchAuthor from "./hooks/useSearchAuthor"
import AuthorList from "./components/AuthorList"

function AuthorManagementPage() {
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 20
    })
    const [queries, setQueries] = useState({
        keyword: '',
        ...pagination
    })
    const { data, status, setSubmit } = useSearchAuthor(queries)
    const [refetch, setRefetch] = useState({
        value: false
    })
    const [openAddAuthorIW, setOpenAddAuthorIW] = useState(({
        value: false
    }))

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
                        <div className="text-[1.4rem] font-[600]">Quản Lý Tác Giả</div>
                    </div>
                </div>

                <div className="h-full flex flex-col min-h-[100vh]">
                    <div className="flex justify-between items-center">
                        <div className="flex space-x-2">
                            <IconButton
                                icon={(<i className="fa-solid fa-plus"></i>)}
                                content="Thêm"
                                backgroundColor="#21C55D"
                                onClick={() => setOpenAddAuthorIW({
                                    value: true
                                })}
                            />

                            <IconButton
                                content="Refresh"
                                onClick={() => setRefetch({
                                    value: true
                                })}
                            />
                        </div>

                        <div className="flex space-x-2">
                            <SearchInput
                                placeholder='Tìm kiếm bằng id, tên tác giả...'
                                onChange={(e) => setQueries({
                                    ...queries,
                                    keyword: e.target.value
                                })}
                            />
                        </div>
                    </div>

                    <div className="relative grow overflow-y-auto mt-2">
                        <AuthorList
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

            <AddAuthorIW
                open={openAddAuthorIW}
                setRefetchAuthorList={setRefetch}
            />
        </>
    )
}

export default memo(AuthorManagementPage)