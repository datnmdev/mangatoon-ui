import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { statusContent } from '../../../../constants'
import { PENDING, SUCCEEDED } from '../../../../../../../../../../constants/fetchStatus.constant'
import { toastActions } from '../../../../../../../../../../features/toast.feature'
import { ERROR, SUCCESS } from '../../../../../../../../../../components/Toast/constants'
import Input from '../../../../../../../../../../components/Input'
import Button from '../../../../../../../../../../components/Button'
import useUpdateChapter from './hooks/useUpdateChapter'

function UpdateChapterForm({
    chapter,
    setRefetchChapterList
}) {
    const dispatch = useDispatch()
    const [inputData, setInputData] = useState({
        order: String(chapter.order),
        name: chapter.name,
    })
    const [data, setData] = useState(chapter)
    const {data: updateChapterData, status: updateChapterStatus, setSubmit: setUpdateChapterSubmit} = useUpdateChapter(data)

    function validate() {
        if (inputData.name.length === 0) {
            return false
        }

        if (inputData.order.length === 0 || isNaN(Number(inputData.order))) {
            return false
        }

        return true
    }

    useEffect(() => {
        setData({
            ...data,
            ...inputData,
            order: isNaN(Number(inputData.order)) ? undefined : Number(inputData.order)
        })
    }, [inputData])

    useEffect(() => {
        if (updateChapterStatus === SUCCEEDED) {
            if (updateChapterData.data) {
                dispatch(toastActions.addToast({
                    type: SUCCESS,
                    title: 'Cập nhật chương thành công!',
                    message: `Thông tin của chương có id là ${chapter.id} đã được lưu lại vào cơ sở dữ liệu.`
                }))
                setRefetchChapterList({
                    value: true
                })
            } else {
                dispatch(toastActions.addToast({
                    type: ERROR,
                    title: 'Cập nhật chương thất bại!',
                    message: `Đã có lỗi xảy ra. Vui lòng thử lại.`
                }))
            }
        }
    }, [updateChapterStatus])

    return (
        <div>
            <div className="space-y-4">
                <div>
                    <div>Order</div>
                    <Input
                        value={inputData.order}
                        onChange={e => setInputData({
                            ...inputData,
                            order: e.target.value
                        })}
                    />
                </div>

                <div>
                    <div>Name</div>
                    <Input
                        value={inputData.name}
                        onChange={e => setInputData({
                            ...inputData,
                            name: e.target.value
                        })}
                    />
                </div>

                <div>
                    <div>Status</div>
                    <Input
                        value={statusContent[chapter.status]}
                        disabled={true}
                    />
                </div>

                <div>
                    <div>Story Id</div>
                    <Input
                        value={chapter.storyId}
                        disabled={true}
                    />
                </div>
            </div>

            <div className="flex justify-end mt-4">
                <div>
                    <Button
                        backgroundColor="rgb(33, 197, 93)"
                        onClick={() => setUpdateChapterSubmit(true)}
                        disabled={updateChapterStatus === PENDING || !validate()}
                    >
                        Lưu thay đổi
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default UpdateChapterForm