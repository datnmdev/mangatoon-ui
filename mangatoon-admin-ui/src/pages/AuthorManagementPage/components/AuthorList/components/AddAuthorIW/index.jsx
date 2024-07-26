import InlineWindow from "../../../../../../components/InlineWindow"
import AddAuthorForm from "./components/AddAuthorForm"

function AddAuthorIW({
    open,
    setRefetchAuthorList
}) {
    return (
        <InlineWindow
            title='Tạo tác giả'
            open={open}
        >
            <div className="px-6 py-4">
                <AddAuthorForm
                    setRefetchAuthorList={setRefetchAuthorList}
                />
            </div>
        </InlineWindow>
    )
}

export default AddAuthorIW