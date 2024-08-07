import TopList from "../../../../components/TopList"
import Topic from "../../../../components/Topic"
import TopFollowList from "./components/TopFollowList"

function TopFollow() {

    return (
        <Topic
            name={(
                <h3 className='inline-block text-[28px] font-[700] font-sans text-transparent [background-image:radial-gradient(50%_124.93%_at_95.86%_-10%,#3efad9_0,hsla(0,0%,100%,0)_100%),linear-gradient(91.56deg,#ff9357_1.54%,#9100ff_98.71%)] bg-clip-text'>
                    Top Những Bộ Truyện Có Lượt Theo Dõi Cao Nhất
                </h3>
            )}
        >
            <div className='mt-4'>
                <TopFollowList />
            </div>
        </Topic>
    )
}

export default TopFollow