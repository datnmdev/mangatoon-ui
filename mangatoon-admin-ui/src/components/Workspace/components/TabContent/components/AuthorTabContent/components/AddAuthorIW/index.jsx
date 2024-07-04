import InlineWindow from "../../../../../../../InlineWindow"
import AddAuthorForm from "./components/AddGenreForm"

function AddAuthorIW({ isOpenWindow }) {
    return (
        <InlineWindow
            title='Tác Giả'
            isOpenWindow={isOpenWindow}
        >
            <div className="px-6 py-4">
                <AddAuthorForm />
            </div>
        </InlineWindow>

    )
}

export default AddAuthorIW
