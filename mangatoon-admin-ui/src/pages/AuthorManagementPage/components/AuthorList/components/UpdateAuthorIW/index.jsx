import InlineWindow from "../../../../../../components/InlineWindow"
import UpdateAuthorForm from "./components/UpdateAuthorForm"

function UpdateAuthorIW({
    open,
    author,
    setRefetchAuthorList
}) {
    return (
        <InlineWindow
            title='Cập nhật tác giả'
            open={open}
        >
            <div className="px-6 py-4">
                <UpdateAuthorForm
                    author={author}
                    setRefetchAuthorList={setRefetchAuthorList}
                />
            </div>
        </InlineWindow>
    )
}

export default UpdateAuthorIW