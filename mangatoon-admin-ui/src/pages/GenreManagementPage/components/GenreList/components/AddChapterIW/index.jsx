import InlineWindow from "../../../../../../components/InlineWindow"
import AddGenreForm from "./components/AddGenreForm"

function AddGenreIW({
    open,
    setRefetchGenreList
}) {
    return (
        <InlineWindow
            title='Tạo thể loại'
            open={open}
        >
            <div className="px-6 py-4">
                <AddGenreForm
                    setRefetchGenreList={setRefetchGenreList}
                />
            </div>
        </InlineWindow>
    )
}

export default AddGenreIW