import { useEffect } from "react"
import { PENDING, SUCCEEDED } from "../../../../constants/fetchStatus.constant"
import useGetStory from "./hooks/useGetStory"
import moment from "moment"
import { Link } from "react-router-dom"
import useGetChapter from "./hooks/useGetChapter"
import location from "../../../../routers/location"
import IconButton from "../../../../components/IconButton"
import useDeleteHistoryDetail from "./hooks/useDeleteHistoryDetail"
import { urlOfStoryServiceGenerator } from "../../../../helpers/url"

function HistoryItem({ 
    data,
    setRefetchHistoryList
}) {
    const { data: getChapterData, status: getChapterStatus, setSubmit: setGetChapterSubmit } = useGetChapter(data)
    const { data: getStoryData, status: getStoryStatus, setSubmit: setGetStorySubmit } = useGetStory(getChapterData?.data?.rows?.[0])
    const { data: deleteHistoryDetailData, status: deleteHistoryDetailStatus, setSubmit: setDeleteHistoryDetailSubmit } = useDeleteHistoryDetail(data.id)

    useEffect(() => {
        setGetChapterSubmit(true)
    }, [])

    useEffect(() => {
        if (getChapterData) {
            setGetStorySubmit(true)
        }
    }, [getChapterData])

    useEffect(() => {
        if (deleteHistoryDetailStatus === SUCCEEDED) {
            if (deleteHistoryDetailData.data) {
                setRefetchHistoryList({
                    value: true
                })
            }
        }
    }, [deleteHistoryDetailStatus])

    console.log(getStoryData?.data);

    return (
        <div className="flex justify-between items-center bg-white rounded-[6px] overflow-hidden p-2 space-x-4">
            <div>
                <img
                    className="w-[64px] h-[84px] rounded-[6px]"
                    src={(getStoryData?.data && getStoryStatus != PENDING) ? urlOfStoryServiceGenerator(getStoryData.data.rows[0].coverImageUrl) : ''}
                    alt={(getStoryData?.data && getStoryStatus != PENDING) ? getStoryData.data.rows[0].title : ''}
                />
            </div>

            <div className="grow h-full flex justify-between items-center">
                <div className="space-y-1">
                    {getStoryData?.data && getStoryStatus != PENDING
                        ? (
                            <Link
                                to={location.bookInfoPage(getStoryData.data.rows[0])}
                                className="hover:underline hover:text-[#F08121]"
                            >
                                <h3 className="font-[450] text-[1.1rem]">{getStoryData.data.rows[0].title}</h3>
                            </Link>
                        )
                        : null}

                    <div>
                        <span className="text-[0.95rem]">Xem vào lúc {moment(data.createdAt).format("HH:mm:ss DD-MM-YYYY")}</span>
                    </div>

                    <div>
                        {getChapterData?.data && getChapterStatus != PENDING && getStoryData?.data && getStoryStatus != PENDING
                            ? (
                                <Link
                                    to={location.chapterContentPage(getStoryData.data.rows[0], getChapterData.data.rows[0])}
                                    className='bg-[#55CAF2] px-3 py-1.5 text-white rounded-[4px] text-[0.9rem] hover:opacity-80'
                                >
                                    Đọc tiếp {getChapterData.data.rows[0].name}
                                </Link>
                            )
                            : null}
                    </div>
                </div>

                <div>
                    <IconButton 
                        icon={(<i className="fa-solid fa-trash-can"></i>)}
                        backgroundColor="red"
                        disabled={deleteHistoryDetailStatus === PENDING}
                        onClick={() => setDeleteHistoryDetailSubmit(true)}
                    />
                </div>
            </div>
        </div>
    )
}

export default HistoryItem