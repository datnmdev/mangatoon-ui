import { Rating, Skeleton } from "@mui/material"
import useGetRatingOfStory from "./hooks/useGetRatingOfStory"
import useGetViewCount from "./hooks/useGetViewCount"
import useGetFollowCountOfStory from "./hooks/useGetFollowCountOfStory"
import { memo, useEffect } from "react"
import { PENDING } from "../../constants/fetchStatus.constant"
import { Link } from "react-router-dom"
import location from "../../routers/location"
import { urlOfStoryServiceGenerator } from "../../helpers/url"

function TopItem({
    number,
    data,
    strokeColor = "#4a4747"
}) {
    const { data: getRatingOfStoryData, status: getRatingOfStoryStatus, setSubmit: setGetRatingOfStorySubmit } = useGetRatingOfStory(data.id)
    const { data: getFollowCountOfStoryData, status: getFollowCountOfStoryStatus, setSubmit: setGetFollowCountOfStorySubmit } = useGetFollowCountOfStory(data.id)
    const { data: getViewCountData, status: getViewCountStatus, setSubmit: setGetViewCountSubmit } = useGetViewCount(data.id)

    useEffect(() => {
        setGetRatingOfStorySubmit(true)
        setGetFollowCountOfStorySubmit(true)
        setGetViewCountSubmit(true)
    }, [])

    return (
        <div className="flex justify-between items-center space-x-2">
            <div className="p-2 w-[60px] h-[60px] flex justify-center items-center">
                <span
                    className="text-transparent font-[900] text-[38px]"
                    style={{
                        'WebkitTextStrokeWidth': '2px',
                        'WebkitTextStrokeColor': strokeColor
                    }}
                >
                    {number}
                </span>
            </div>

            <div className="grow flex justify-between items-center">
                <div className="flex space-x-2 items-center">
                    <div>
                        <img
                            className="w-12 h-12 object-cover object-center rounded-[4px] shrink-0"
                            src={urlOfStoryServiceGenerator(data.coverImageUrl)}
                            alt={data.title}
                        />
                    </div>

                    <div>
                        <Link 
                            to={location.bookInfoPage(data)}
                            className="hover:text-[#F08121]"
                        >
                            <h3 className="font-[450]">{data.title}</h3>
                        </Link>

                        {getRatingOfStoryStatus === PENDING || !getRatingOfStoryData?.data
                            ? (
                                <Skeleton>
                                    <Rating
                                        readOnly={true}
                                    />
                                </Skeleton>
                            )
                            : (
                                <Rating
                                    readOnly={true}
                                    precision={0.1}
                                    defaultValue={getRatingOfStoryData.data.rating * 5}
                                />
                            )}
                    </div>
                </div>

                <div className="flex items-center justify-center space-x-4">
                    <div className="space-x-1">
                        <span className="text-red-500">
                            <i className="fa-solid fa-heart"></i>
                        </span>

                        {getFollowCountOfStoryStatus === PENDING || !getFollowCountOfStoryData?.data
                            ? (
                                <span>
                                    ---
                                </span>
                            )
                            : (
                                <span>
                                    {getFollowCountOfStoryData.data.followCount}
                                </span>
                            )}

                    </div>

                    <div className="space-x-1">
                        <span className="text-[#4a90e2]">
                            <i className="fa-regular fa-eye"></i>
                        </span>

                        {getViewCountStatus === PENDING || !getViewCountData?.data
                            ? (
                                <span>
                                    ---
                                </span>
                            )
                            : (
                                <span>
                                    {getViewCountData.data.viewCount}
                                </span>
                            )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default memo(TopItem)