import { memo, useEffect, useState } from 'react'
import useSearchChapter from './hooks/useSearchChapter'
import IconButton from '../../../../components/IconButton'
import SearchInput from '../../../../components/SearchInput'
import Filter from '../../../../components/Filter'
import { CHECKBOX } from '../../../../components/Filter/components/constants'
import { CREATED, DELETED } from './components/ChapterList/constants'
import ChapterList from './components/ChapterList'
import AddChapterIW from './components/ChapterList/components/AddChapterIW'

function ChapterManagement({
    storyId
}) {
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 10
    })
    const [queries, setQueries] = useState({
        keyword: '',
        status: `${CREATED}`,
        storyId,
        ...pagination
    })
    const { data, status, setSubmit } = useSearchChapter(queries)
    const [refetch, setRefetch] = useState({
        value: false
    })
    const [openAddChapterIW, setOpenAddChapterIW] = useState(({
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
            <div className="space-y-2">
                <div className="flex justify-between items-center">
                    <div>
                        <div className="text-[1.4rem] font-[600]">Quản Lý Chương Của Truyện</div>
                    </div>
                </div>

                <div className="h-full flex flex-col bg-white">
                    <div className="flex justify-between items-center">
                        <div className="flex space-x-2">
                            <IconButton
                                icon={(<i className="fa-solid fa-plus"></i>)}
                                content="Thêm"
                                backgroundColor="#21C55D"
                                onClick={() => setOpenAddChapterIW({
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
                                placeholder='Tìm kiếm bằng id, tên chương...'
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
                                                title: 'created',
                                                value: CREATED
                                            },
                                            {
                                                title: 'delete',
                                                value: DELETED
                                            }
                                        ]
                                    }
                                ]}
                                onChange={value => {
                                    if (value?.status) {
                                        if (value.status?.length === 0) {
                                            setQueries({
                                                ...queries,
                                                status: `${CREATED}`
                                            })
                                        } else {
                                            setQueries({
                                                ...queries,
                                                status: value.status.join(',')
                                            })
                                        }
                                    }
                                }}
                            />
                        </div>
                    </div>

                    <div className="relative grow overflow-y-auto mt-2">
                        <ChapterList
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

            <AddChapterIW 
                open={openAddChapterIW}
                storyId={storyId}
                setRefetchChapterList={setRefetch}
            />
        </>
    )
}

export default memo(ChapterManagement)