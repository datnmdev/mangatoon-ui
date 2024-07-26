import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import useUpdateGenre from "./hooks/useUpdateGenre"
import { PENDING, SUCCEEDED } from "../../../../../../../../constants/fetchStatus.constant"
import { toastActions } from "../../../../../../../../features/toast.feature"
import { ERROR, SUCCESS } from "../../../../../../../../components/Toast/constants"
import Input from "../../../../../../../../components/Input"
import TextEditor from "../../../../../../../../components/TextEditor"
import Button from "../../../../../../../../components/Button"

function UpdateGenreForm({
    genre,
    setRefetchGenreList
}) {
    const dispatch = useDispatch()
    const [data, setData] = useState({
        ...genre,
        description: genre.description ?? ''
    })
    const {data: updateGenreData, status: updateGenreStatus, setSubmit: setUpdateGenreSubmit} = useUpdateGenre(data)

    function validate() {
        if (data.name.length === 0) {
            return false
        }

        return true
    }

    useEffect(() => {
        if (updateGenreStatus === SUCCEEDED) {
            if (updateGenreData.data) {
                dispatch(toastActions.addToast({
                    type: SUCCESS,
                    title: 'Cập nhật thể loại thành công!',
                    message: `Thông tin của thể loại có id là ${genre.id} đã được lưu lại vào cơ sở dữ liệu.`
                }))
                setRefetchGenreList({
                    value: true
                })
            } else {
                dispatch(toastActions.addToast({
                    type: ERROR,
                    title: 'Cập nhật thể loại thất bại!',
                    message: `Đã có lỗi xảy ra. Vui lòng thử lại.`
                }))
            }
        }
    }, [updateGenreStatus])

    return (
        <div>
            <div className="space-y-4">
                <div>
                    <div>Id</div>
                    <Input
                        value={genre.id}
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

                <div>
                    <div>Description</div>
                    <TextEditor
                        placeholder="Mô tả thể loại..."
                        value={data.description}
                        onChange={value => setData({
                            ...data,
                            description: value
                        })}
                    />
                </div>
            </div>

            <div className="flex justify-end mt-4">
                <div>
                    <Button
                        backgroundColor="rgb(33, 197, 93)"
                        onClick={() => setUpdateGenreSubmit(true)}
                        disabled={updateGenreStatus === PENDING || !validate()}
                    >
                        Lưu thay đổi
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default UpdateGenreForm