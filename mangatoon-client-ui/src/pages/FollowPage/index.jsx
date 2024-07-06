import Topic from "../../components/Topic"
import FollowList from "./components/FollowList"

function FollowPage() {
    return (
        <div className="my-8 sm:px-2">
            <div className="container mx-auto">
                <Topic
                    name={(
                        <div className="flex justify-between items-center">
                            <div className="space-x-2">
                                <span>
                                    <i className="fa-solid fa-heart"></i>
                                </span>
                                <span>Truyện đã theo dõi</span>
                            </div>
                        </div>
                    )}
                >
                    <FollowList />
                </Topic>
            </div>
        </div>
    )
}

export default FollowPage