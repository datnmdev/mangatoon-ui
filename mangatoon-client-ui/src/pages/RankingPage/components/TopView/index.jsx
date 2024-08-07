import Topic from '../../../../components/Topic'
import TopWeekList from './components/TopWeekList'

function TopView() {
    return (
        <Topic
            name={(
                <h3 className='inline-block text-[28px] font-[700] font-sans text-transparent [background-image:radial-gradient(50%_124.93%_at_95.86%_-10%,#3efad9_0,hsla(0,0%,100%,0)_100%),linear-gradient(91.56deg,#ff9357_1.54%,#9100ff_98.71%)] bg-clip-text'>
                    Top những bộ truyện có tổng số lượt xem cao nhất
                </h3>
            )}
        >
            <TopWeekList />
        </Topic>
    )
}

export default TopView