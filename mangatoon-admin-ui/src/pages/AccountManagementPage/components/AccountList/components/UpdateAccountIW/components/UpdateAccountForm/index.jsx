import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { PENDING, SUCCEEDED } from "../../../../../../../../constants/fetchStatus.constant"
import { toastActions } from "../../../../../../../../features/toast.feature"
import { ERROR, SUCCESS } from "../../../../../../../../components/Toast/constants"
import Input from "../../../../../../../../components/Input"
import Button from "../../../../../../../../components/Button"
import useUpdateAccount from "../../../../hooks/useUpdateAccount"
import SelectSearch from "../../../../../../../../components/SelectSearch"
import { ACTIVATED, AccountStatusContent, DELETED, LOCKED, UNACTIVATED } from "../../../../../../constants"

function UpdateAccountForm({
    account,
    setRefetchAccountList
}) {
    const dispatch = useDispatch()
    const [data, setData] = useState({
        id: account.id,
        status: {
            name: AccountStatusContent[account.status],
            value: account.status
        }
    })
    const [body, setBody] = useState({
        ...data,
        status: data.status.value
    })
    const { data: updateAccountData, status: updateAccountStatus, setSubmit: setUpdateAccountSubmit } = useUpdateAccount(body)

    function validate() {
        return true
    }

    useEffect(() => {
        setBody({
            ...data,
            status: data.status.value
        })
    }, [data])

    useEffect(() => {
        if (updateAccountStatus === SUCCEEDED) {
            dispatch(toastActions.addToast({
                type: SUCCESS,
                title: 'Cập nhật tài khoản thành công!',
                message: `Thông tin của tài khoản có id là ${account.id} đã được lưu lại vào cơ sở dữ liệu.`
            }))
            setRefetchAccountList({
                value: true
            })
        }
    }, [updateAccountStatus])

    return (
        <div>
            <div className="space-y-4">
                <div>
                    <div>Account Id</div>
                    <Input
                        value={account.id}
                        disabled={true}
                    />
                </div>

                <div>
                    <div>Name</div>
                    <SelectSearch
                        maxHeight="80px"
                        placeholder="Chọn trạng thái"
                        value={data.status}
                        options={[
                            {
                                name: AccountStatusContent[UNACTIVATED],
                                value: UNACTIVATED
                            },
                            {
                                name: AccountStatusContent[ACTIVATED],
                                value: ACTIVATED
                            },
                            {
                                name: AccountStatusContent[LOCKED],
                                value: LOCKED
                            },
                            {
                                name: AccountStatusContent[DELETED],
                                value: DELETED
                            }
                        ]}
                        onChange={option => setData({
                            ...data,
                            status: option
                        })}

                    />
                </div>
            </div>

            <div className="flex justify-end mt-4">
                <div>
                    <Button
                        backgroundColor="rgb(33, 197, 93)"
                        onClick={() => setUpdateAccountSubmit(true)}
                        disabled={updateAccountStatus === PENDING || !validate()}
                    >
                        Lưu thay đổi
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default UpdateAccountForm