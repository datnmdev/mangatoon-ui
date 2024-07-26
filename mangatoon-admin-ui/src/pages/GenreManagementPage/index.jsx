import { memo, useEffect, useState } from "react"
import useSearchGenre from "./hooks/useSearchGenre"
import IconButton from "../../components/IconButton"
import SearchInput from "../../components/SearchInput"
import GenreList from "./components/GenreList"
import AddGenreIW from "./components/GenreList/components/AddChapterIW"

function GenreManagementPage() {
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 20
    })
    const [queries, setQueries] = useState({
        keyword: '',
        ...pagination
    })
    const { data, status, setSubmit } = useSearchGenre(queries)
    const [refetch, setRefetch] = useState({
        value: false
    })
    const [openAddGenreIW, setOpenAddGenreIW] = useState(({
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
                        <div className="text-[1.4rem] font-[600]">Quản Lý Thể Loại</div>
                    </div>
                </div>

                <div className="h-full flex flex-col min-h-[100vh]">
                    <div className="flex justify-between items-center">
                        <div className="flex space-x-2">
                            <IconButton
                                icon={(<i className="fa-solid fa-plus"></i>)}
                                content="Thêm"
                                backgroundColor="#21C55D"
                                onClick={() => setOpenAddGenreIW({
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
                                placeholder='Tìm kiếm bằng id, tên thể loại...'
                                onChange={(e) => setQueries({
                                    ...queries,
                                    keyword: e.target.value
                                })}
                            />
                        </div>
                    </div>

                    <div className="relative grow overflow-y-auto mt-2">
                        <GenreList
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

            <AddGenreIW
                open={openAddGenreIW}
                setRefetchGenreList={setRefetch}
            />
        </>
    )
}

export default memo(GenreManagementPage)