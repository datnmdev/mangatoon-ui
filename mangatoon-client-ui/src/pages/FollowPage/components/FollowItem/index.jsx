import { Link } from 'react-router-dom'
import IconButton from '../../../../components/IconButton';
import location from '../../../../routers/location';
import useGetFollowCount from './hooks/useGetFollowCount';
import { useEffect, useRef } from 'react';
import { PENDING, SUCCEEDED } from '../../../../constants/fetchStatus.constant';
import { Skeleton } from '@mui/material';
import useDeleteFollow from './hooks/useDeleteFollow';
import api from '../../../../api';
import { urlOfStoryServiceGenerator } from '../../../../helpers/url';

function FollowItem({
    data,
    setRefetchFollowList
}) {
    const { data: getFollowCountData, status: getFollowCountStatus, setSubmit: setGetFollowCountSubmit } = useGetFollowCount(data.id)
    const { data: deleteFollowData, status: deleteFollowStatus, setSubmit: setDeleteFollowSubmit } = useDeleteFollow({
        storyId: data.id
    })

    useEffect(() => {
        setGetFollowCountSubmit(true)
    }, [])

    useEffect(() => {
        if (deleteFollowStatus === SUCCEEDED) {
            if (deleteFollowData.data) {
                setRefetchFollowList(true)
            }
        }
    }, [deleteFollowStatus])

    return (
        <div className="flex justify-between items-center bg-white rounded-[6px] overflow-hidden p-2 space-x-4">
            <div>
                <img
                    className="w-[64px] h-[84px] rounded-[6px]"
                    src={urlOfStoryServiceGenerator(data.coverImageUrl)}
                    alt={data.title}
                />
            </div>

            <div className="grow h-full flex justify-between items-center">
                <div className="space-y-1">
                    <Link
                        to={location.bookInfoPage(data)}
                        className="hover:underline hover:text-[#F08121]"
                    >
                        <h3 className="font-[450] text-[1.1rem]">{data.title}</h3>
                    </Link>

                    <div>
                        {getFollowCountStatus === PENDING || !getFollowCountData?.data
                            ? (
                                <Skeleton variant='rounded' animation="wave">
                                    <span className="text-[0.95rem]">Tổng số lượt theo dõi: 999M</span>
                                </Skeleton>
                            )
                            : (
                                <span className="text-[0.95rem]">Tổng số lượt theo dõi: {getFollowCountData.data.followCount}</span>
                            )}
                    </div>
                </div>

                <div>
                    <IconButton
                        icon={(<i className="fa-solid fa-trash-can"></i>)}
                        backgroundColor="red"
                        disabled={deleteFollowStatus === PENDING}
                        onClick={() => setDeleteFollowSubmit(true)}
                    />
                </div>
            </div>
        </div>
    )
}

export default FollowItem