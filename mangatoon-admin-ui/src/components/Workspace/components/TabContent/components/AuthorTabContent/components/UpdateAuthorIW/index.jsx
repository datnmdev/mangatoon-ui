import InlineWindow from "../../../../../../../InlineWindow"
import UpdateAuthorForm from "./components/UpdateGenreForm"

function UpdateAuthorIW({ isOpenWindow }) {
    return (
        <InlineWindow
            title='Tác Giả'
            isOpenWindow={isOpenWindow}
        >
            <div className="px-6 py-4">
                <UpdateAuthorForm />
            </div>
        </InlineWindow>

    )
}

export default UpdateAuthorIW
