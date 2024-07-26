import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { PENDING, SUCCEEDED } from "../../../../../../../../constants/fetchStatus.constant"
import { toastActions } from "../../../../../../../../features/toast.feature"
import { ERROR, SUCCESS } from "../../../../../../../../components/Toast/constants"
import Input from "../../../../../../../../components/Input"
import Button from "../../../../../../../../components/Button"
import useUpdateAuthor from "./hooks/useUpdateAuthor"

function UpdateAuthorForm({
    author,
    setRefetchAuthorList
}) {
    const dispatch = useDispatch()
    const [data, setData] = useState(author)
    const {data: updateAuthorData, status: updateAuthorStatus, setSubmit: setUpdateAuthorSubmit} = useUpdateAuthor(data)

    function validate() {
        if (data.name.length === 0) {
            return false
        }

        return true
    }

    useEffect(() => {
        if (updateAuthorStatus === SUCCEEDED) {
            if (updateAuthorData.data) {
                dispatch(toastActions.addToast({
                    type: SUCCESS,
                    title: 'Cập nhật tác giả thành công!',
                    message: `Thông tin của tác giả có id là ${author.id} đã được lưu lại vào cơ sở dữ liệu.`
                }))
                setRefetchAuthorList({
                    value: true
                })
            } else {
                dispatch(toastActions.addToast({
                    type: ERROR,
                    title: 'Cập nhật tác giả thất bại!',
                    message: `Đã có lỗi xảy ra. Vui lòng thử lại.`
                }))
            }
        }
    }, [updateAuthorStatus])

    return (
        <div>
            <div className="space-y-4">
                <div>
                    <div>Id</div>
                    <Input
                        value={author.id}
                        disabled={true}
                    />
                </div>

                <div>
                    <div>Name</div>
                    <Input
                        value={data.name}
                        onChange={e => setData({
                            ...data,
                            name: e.target.value
                        })}
                    />
                </div>
            </div>

            <div className="flex justify-end mt-4">
                <div>
                    <Button
                        backgroundColor="rgb(33, 197, 93)"
                        onClick={() => setUpdateAuthorSubmit(true)}
                        disabled={updateAuthorStatus === PENDING || !validate()}
                    >
                        Lưu thay đổi
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default UpdateAuthorForm