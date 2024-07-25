import InlineWindow from "../../../../../../components/InlineWindow"
import AddStoryAuthorForm from "./components/AddStoryAuthorForm"

function AddStoryAuthorIW({ 
    open,
    storyId,
    setRefetchStoryAuthorList
}) {
    return (
        <InlineWindow
            title='Tác giả của truyện'
            open={open}
        >
            <div className="px-6 py-4">
                <AddStoryAuthorForm 
                    storyId={storyId}
                    setRefetchStoryAuthorList={setRefetchStoryAuthorList}
                />
            </div>
        </InlineWindow>
    )
}

export default AddStoryAuthorIW