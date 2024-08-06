import { Pagination } from '@mui/material'
import { useSelector } from 'react-redux'
import FollowItem from '../FollowItem'
import useGetFollowList from './hooks/useGetFollowList'
import { userSelectors } from '../../../../features/user.feature'
import { useEffect, useState } from 'react'
import { PENDING, SUCCEEDED } from '../../../../constants/fetchStatus.constant'
import Empty from '../../../../components/Empty'

function FollowList() {
    const profile = useSelector(userSelectors.selectProfile)
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 16
    })
    const { data: getFollowListData, status: getFollowListStatus, setSubmit: setGetFollowListSubmit } = useGetFollowList({
        userId: profile?.id,
        ...pagination
    })

    useEffect(() => {
        if (profile) {
            setGetFollowListSubmit(true)
        }
    }, [profile, pagination.page])

    useEffect(() => {
        if (getFollowListStatus === SUCCEEDED) {
            if (getFollowListData.data) {
                if (getFollowListData.data.rows.length === 0 && pagination.page > 1) {
                    setPagination({
                        ...pagination,
                        page: pagination.page - 1
                    })
                }
            }
        }
    }, [getFollowListStatus])

    if (getFollowListStatus === PENDING || !getFollowListData?.data) {
        return (
            <div>Loading...</div>
        )
    }

    if (getFollowListData.data.rows.length === 0) {
        return (
            <Empty />
        )
    }

    return (
        <div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-1 sm:gap-0">
                {getFollowListData.data.rows.map(row => row.story).map(story => {
                    return (
                        <FollowItem
                            key={story.id}
                            data={story}
                            setRefetchFollowList={setGetFollowListSubmit}
                        />
                    )
                })}
            </div>

            <div className="flex justify-center items-center mt-8">
                <Pagination
                    size="large"
                    page={pagination.page}
                    count={Math.ceil(getFollowListData.data.count / pagination.limit)}
                    onChange={(e, page) => setPagination({
                        ...pagination,
                        page
                    })}
                />
            </div>
        </div>
    )
}

export default FollowList