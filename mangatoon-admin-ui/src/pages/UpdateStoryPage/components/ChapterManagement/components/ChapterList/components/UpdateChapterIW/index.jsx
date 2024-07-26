import InlineWindow from "../../../../../../../../components/InlineWindow"
import UpdateChapterForm from "./components/UpdateChapterForm"

function UpdateChapterIW({
    open,
    chapter,
    setRefetchChapterList
}) {
    return (
        <InlineWindow
            title='Cập nhật chương'
            open={open}
        >
            <div className="px-6 py-4">
                <UpdateChapterForm 
                    chapter={chapter}
                    setRefetchChapterList={setRefetchChapterList}
                />
            </div>
        </InlineWindow>
    )
}

export default UpdateChapterIW