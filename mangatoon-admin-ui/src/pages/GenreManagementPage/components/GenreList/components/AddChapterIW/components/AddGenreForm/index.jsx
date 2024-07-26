import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { PENDING, SUCCEEDED } from "../../../../../../../../constants/fetchStatus.constant"
import { toastActions } from "../../../../../../../../features/toast.feature"
import { ERROR, SUCCESS } from "../../../../../../../../components/Toast/constants"
import Button from "../../../../../../../../components/Button"
import Input from "../../../../../../../../components/Input"
import useCreateGenre from "./hooks/useCreateGenre"

function AddGenreForm({
    setRefetchGenreList
}) {
    const dispatch = useDispatch()
    const [data, setData] = useState({
        name: ''
    })
    const {data: createGenreData, status: createGenreStatus, setSubmit: setCreateGenreSubmit} = useCreateGenre(data)

    function validate() {
        if (data.name.length === 0) {
            return false
        }

        return true
    }

    useEffect(() => {
        if (createGenreStatus === SUCCEEDED) {
            if (createGenreData.data) {
                dispatch(toastActions.addToast({
                    type: SUCCESS,
                    title: 'Tạo thể loại thành công!',
                    message: `Thể loại ${createGenreData.data.name} đã được lưu vào cơ sở dữ liệu.`
                }))
                setRefetchGenreList({
                    value: true
                })
            } else {
                dispatch(toastActions.addToast({
                    type: ERROR,
                    title: 'Tạo thể loại thất bại!',
                    message: `Đã có lỗi xảy ra. Vui lòng thử lại.`
                }))
            }
        }
    }, [createGenreStatus])

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
                        onClick={() => setCreateGenreSubmit(true)}
                        disabled={createGenreStatus === PENDING || !validate()}
                    >
                        Tạo
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default AddGenreForm