import InlineWindow from "../../../../../../../../../InlineWindow"
import AddAliasForm from "./components/AddAliasForm"

function AddAliasIW({
    isOpenWindow
}) {
    return (
        <InlineWindow
            title='Tên khác của truyện'
            isOpenWindow={isOpenWindow}
        >
            <div className="px-6 py-4">
                <AddAliasForm />
            </div>
        </InlineWindow>
    )
}

export default AddAliasIW