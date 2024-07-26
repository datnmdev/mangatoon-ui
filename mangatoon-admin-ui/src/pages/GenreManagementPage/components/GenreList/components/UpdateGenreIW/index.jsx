import InlineWindow from "../../../../../../components/InlineWindow"
import UpdateGenreForm from "./components/UpdateGenreForm"

function UpdateGenreIW({
    open,
    genre,
    setRefetchGenreList
}) {
    return (
        <InlineWindow
            title='Cập nhật thể loại'
            open={open}
        >
            <div className="px-6 py-4">
                <UpdateGenreForm
                    genre={genre}
                    setRefetchGenreList={setRefetchGenreList}
                />
            </div>
        </InlineWindow>
    )
}

export default UpdateGenreIW