import { useEffect, useState } from "react"
import Button from "../../../../../../../../components/Button"
import Input from "../../../../../../../../components/Input"
import useCreateAlias from "./hooks/useCreateAlias"
import { PENDING, SUCCEEDED } from "../../../../../../../../constants/fetchStatus.constant"
import { useDispatch } from "react-redux"
import { toastActions } from "../../../../../../../../features/toast.feature"
import { ERROR, SUCCESS } from "../../../../../../../../components/Toast/constants"

function AddAliasForm({
    storyId,
    setRefetchAliasList
}) {
    const dispatch = useDispatch()
    const [data, setData] = useState({
        storyId,
        title: ''
    })
    const {data: createAliasData, status: createAliasStatus, setSubmit: setCreateAliasSubmit} = useCreateAlias(data)

    function validate() {
        if (data.title.length === 0) {
            return false
        }

        return true
    }

    useEffect(() => {
        if (createAliasStatus === SUCCEEDED) {
            if (createAliasData.data) {
                dispatch(toastActions.addToast({
                    type: SUCCESS,
                    title: 'Thêm tiêu đề cho truyện thành công!',
                    message: `Tiêu đề ${createAliasData.data.title} đã được áp dụng và lưu vào cơ sở dữ liệu.`
                }))
                setRefetchAliasList({
                    value: true
                })
            } else {
                dispatch(toastActions.addToast({
                    type: ERROR,
                    title: 'Thêm tiêu đề cho truyện thất bại!',
                    message: `Đã có lỗi xảy ra. Vui lòng thử lại.`
                }))
            }
        }
    }, [createAliasStatus])

    return (
        <div>
            <div className="space-y-4">
                <div>
                    <div>Title</div>
                    <Input
                        value={data.title}
                        onChange={e => setData({
                            ...data,
                            title: e.target.value
                        })}
                    />
                </div>

                <div>
                    <div>Story Id</div>
                    <Input
                        value={storyId}
                        disabled={true}
                    />
                </div>
            </div>

            <div className="flex justify-end mt-4">
                <div>
                    <Button
                        backgroundColor="rgb(33, 197, 93)"
                        onClick={() => setCreateAliasSubmit(true)}
                        disabled={createAliasStatus === PENDING || !validate()}
                    >
                        Tạo
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default AddAliasForm