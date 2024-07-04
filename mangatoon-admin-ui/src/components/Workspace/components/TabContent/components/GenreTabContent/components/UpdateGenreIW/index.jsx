import InlineWindow from "../../../../../../../InlineWindow"
import UpdateGenreForm from "./components/UpdateGenreForm"

function UpdateGenreIW({ isOpenWindow }) {
    return (
        <InlineWindow
            title='Thể Loại'
            isOpenWindow={isOpenWindow}
        >
            <div className="px-6 py-4">
                <UpdateGenreForm />
            </div>
        </InlineWindow>

    )
}

export default UpdateGenreIW
