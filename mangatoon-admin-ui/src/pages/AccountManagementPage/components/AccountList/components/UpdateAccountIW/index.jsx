import InlineWindow from "../../../../../../components/InlineWindow"
import UpdateAccountForm from "./components/UpdateAccountForm"

function UpdateAccountIW({
    open,
    account,
    setRefetchAccountList
}) {
    return (
        <InlineWindow
            title='Cập nhật tài khoản'
            open={open}
        >
            <div className="px-6 py-4">
                <UpdateAccountForm
                    account={account}
                    setRefetchAccountList={setRefetchAccountList}
                />
            </div>
        </InlineWindow>
    )
}

export default UpdateAccountIW