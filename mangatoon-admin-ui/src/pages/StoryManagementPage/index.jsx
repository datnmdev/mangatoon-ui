import { useState } from 'react'
import IconButton from '../../components/IconButton'
import SearchInput from '../../components/SearchInput'
import StoryList from './components/StoryList'
import { DELETED, FINISHED, IN_PROGRESS, SUSPENDED, UNPUBLISHED } from './components/StoryList/constants'
import useSearchStory from './hooks/useSearchStory'
import { useEffect } from 'react'
import Filter from '../../components/Filter'
import { CHECKBOX } from '../../components/Filter/components/constants'

function StoryManagementPage() {
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 20
    })
    const [queries, setQueries] = useState({
        keyword: '',
        status: `${UNPUBLISHED},${IN_PROGRESS},${SUSPENDED},${FINISHED}`,
        ...pagination
    })
    const { data, status, setSubmit } = useSearchStory(queries)
    const [refetch, setRefetch] = useState({
        value: false
    })

    console.log(queries.keyword);

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
        <div className="h-full flex flex-col p-4 bg-white min-h-[100vh]">
            <div className="flex justify-between items-center">
                <div className="flex space-x-2">
                    <IconButton
                        icon={(<i className="fa-solid fa-plus"></i>)}
                        content="Thêm"
                        backgroundColor="#21C55D"
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
                        placeholder='Tìm kiếm bằng id, tiêu đề truyện...'
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
                                        title: 'unpublished',
                                        value: UNPUBLISHED
                                    },
                                    {
                                        title: 'in_progress',
                                        value: IN_PROGRESS
                                    },
                                    {
                                        title: 'suspended',
                                        value: SUSPENDED
                                    },
                                    {
                                        title: 'finished',
                                        value: FINISHED
                                    },
                                    {
                                        title: 'deleted',
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
                                        status: `${UNPUBLISHED},${IN_PROGRESS},${SUSPENDED},${FINISHED}`
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

            <div className="relative grow overflow-y-auto mt-4">
                <StoryList
                    status={status}
                    data={data?.data?.rows}
                    count={data?.data?.count}
                    pagination={pagination}
                    setPagination={setPagination}
                    setRefetch={setRefetch}
                />
            </div>
        </div>
    )
}

export default StoryManagementPage