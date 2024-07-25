import InlineWindow from "../../../../../../components/InlineWindow"
import AddStoryGenreForm from "./components/AddStoryGenreForm"

function AddStoryGenreIW({ 
    open,
    storyId,
    setRefetchStoryGenreList
}) {
    return (
        <InlineWindow
            title='Thể loại của truyện'
            open={open}
        >
            <div className="px-6 py-4">
                <AddStoryGenreForm 
                    storyId={storyId}
                    setRefetchStoryGenreList={setRefetchStoryGenreList}
                />
            </div>
        </InlineWindow>
    )
}

export default AddStoryGenreIW