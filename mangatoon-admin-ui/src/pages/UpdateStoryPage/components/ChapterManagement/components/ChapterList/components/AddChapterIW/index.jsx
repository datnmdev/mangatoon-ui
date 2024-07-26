import InlineWindow from "../../../../../../../../components/InlineWindow"
import AddChapterForm from "./components/AddChapterForm"

function AddChapterIW({
    open,
    storyId,
    setRefetchChapterList
}) {
    return (
        <InlineWindow
            title='Tạo chương'
            open={open}
        >
            <div className="px-6 py-4">
                <AddChapterForm 
                    storyId={storyId}
                    setRefetchChapterList={setRefetchChapterList}
                />
            </div>
        </InlineWindow>
    )
}

export default AddChapterIW