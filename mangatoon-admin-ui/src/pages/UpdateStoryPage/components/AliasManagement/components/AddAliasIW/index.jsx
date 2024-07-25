import { useState } from "react"
import InlineWindow from "../../../../../../components/InlineWindow"
import AddAliasForm from "./components/AddAliasForm"

function AddAliasIW({
    open,
    storyId,
    setRefetchAliasList
}) {
    return (
        <InlineWindow
            title='Tên khác của truyện'
            open={open}
        >
            <div className="px-6 py-4">
                <AddAliasForm 
                    storyId={storyId}
                    setRefetchAliasList={setRefetchAliasList}
                />
            </div>
        </InlineWindow>
    )
}

export default AddAliasIW