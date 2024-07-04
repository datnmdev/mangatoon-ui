import InlineWindow from "../../../../../../../InlineWindow"
import AddGenreForm from "./components/AddGenreForm"

function AddGenreIW({ isOpenWindow }) {
    return (
        <InlineWindow
            title='Thể Loại'
            isOpenWindow={isOpenWindow}
        >
            <div className="px-6 py-4">
                <AddGenreForm />
            </div>
        </InlineWindow>
    )
}

export default AddGenreIW
