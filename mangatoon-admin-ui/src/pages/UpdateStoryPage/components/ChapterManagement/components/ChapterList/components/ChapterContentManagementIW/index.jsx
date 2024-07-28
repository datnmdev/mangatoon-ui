import InlineWindow from "../../../../../../../../components/InlineWindow"
import Content from "./components/Content"

function ChapterContentManagementIW({
    open,
    chapter
}) {
    return (
        <InlineWindow
            title='Nội dung của chương'
            open={open}
        >
            <div className="px-6 py-4">
                <Content
                    chapter={chapter}
                />
            </div>
        </InlineWindow>
    )
}

export default ChapterContentManagementIW