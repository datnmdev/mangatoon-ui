import InlineWindow from "../../../../../../../../../InlineWindow"
import AddStoryAuthorForm from "./components/AddStoryAuthorForm"

function AddStoryAuthorIW({ isOpenWindow }) {
    return (
        <InlineWindow
            title='Tác giả của truyện'
            isOpenWindow={isOpenWindow}
        >
            <div className="px-6 py-4">
                <AddStoryAuthorForm />
            </div>
        </InlineWindow>
    )
}

export default AddStoryAuthorIW