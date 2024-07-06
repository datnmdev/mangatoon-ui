import Topic from '../../components/Topic'
import NewlyUpdatedStoryList from './components/NewlyUpdatedStoryList'

function HomePage() {
    return (
        <div className='my-8 sm:px-2'>
            <div className='container mx-auto'>
                <Topic 
                    name='Truyện Mới Cập Nhật'
                >
                    <NewlyUpdatedStoryList />
                </Topic>
            </div>
        </div>
    )
}

export default HomePage