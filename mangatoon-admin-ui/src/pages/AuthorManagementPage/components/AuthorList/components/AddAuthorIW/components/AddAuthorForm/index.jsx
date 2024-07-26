import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { PENDING, SUCCEEDED } from "../../../../../../../../constants/fetchStatus.constant"
import { toastActions } from "../../../../../../../../features/toast.feature"
import { ERROR, SUCCESS } from "../../../../../../../../components/Toast/constants"
import Button from "../../../../../../../../components/Button"
import Input from "../../../../../../../../components/Input"
import useCreateAuthor from "./hooks/useCreateAuthor"

function AddAuthorForm({
    setRefetchAuthorList
}) {
    const dispatch = useDispatch()
    const [data, setData] = useState({
        name: ''
    })
    const {data: createAuthorData, status: createAuthorStatus, setSubmit: setCreateAuthorSubmit} = useCreateAuthor(data)

    function validate() {
        if (data.name.length === 0) {
            return false
        }

        return true
    }

    useEffect(() => {
        if (createAuthorStatus === SUCCEEDED) {
            if (createAuthorData.data) {
                dispatch(toastActions.addToast({
                    type: SUCCESS,
                    title: 'Tạo tác giả thành công!',
                    message: `Tác giả ${createAuthorData.data.name} đã được lưu vào cơ sở dữ liệu.`
                }))
                setRefetchAuthorList({
                    value: true
                })
            } else {
                dispatch(toastActions.addToast({
                    type: ERROR,
                    title: 'Tạo tác giả thất bại!',
                    message: `Đã có lỗi xảy ra. Vui lòng thử lại.`
                }))
            }
        }
    }, [createAuthorStatus])

    return (
        <div>
            <div className="space-y-4">
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
                        onClick={() => setCreateAuthorSubmit(true)}
                        disabled={createAuthorStatus === PENDING || !validate()}
                    >
                        Tạo
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default AddAuthorForm