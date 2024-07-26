import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import useCreateChapter from './hooks/useCreateChapter'
import { CREATED, statusContent } from '../../../../constants'
import { PENDING, SUCCEEDED } from '../../../../../../../../../../constants/fetchStatus.constant'
import { toastActions } from '../../../../../../../../../../features/toast.feature'
import { SUCCESS } from '../../../../../../../../../../components/Toast/constants'
import Input from '../../../../../../../../../../components/Input'
import Button from '../../../../../../../../../../components/Button'

function AddChapterForm({
    storyId,
    setRefetchChapterList
}) {
    const dispatch = useDispatch()
    const [inputData, setInputData] = useState({
        order: '',
        name: '',
    })
    const [data, setData] = useState({
        order: undefined,
        name: '',
        storyId,
        status: CREATED
    })
    const {data: createChapterData, status: createChapterStatus, setSubmit: setCreateChapterSubmit} = useCreateChapter(data)

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
        if (createChapterStatus === SUCCEEDED) {
            if (createChapterData.data) {
                dispatch(toastActions.addToast({
                    type: SUCCESS,
                    title: 'Tạo chương thành công!',
                    message: `${createChapterData.data.name} đã được lưu vào cơ sở dữ liệu.`
                }))
                setRefetchChapterList({
                    value: true
                })
            } else {
                dispatch(toastActions.addToast({
                    type: ERROR,
                    title: 'Tạo chương thất bại!',
                    message: `Đã có lỗi xảy ra. Vui lòng thử lại.`
                }))
            }
        }
    }, [createChapterStatus])

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
                        value={statusContent[CREATED]}
                        disabled={true}
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
                        onClick={() => setCreateChapterSubmit(true)}
                        disabled={createChapterStatus === PENDING || !validate()}
                    >
                        Tạo
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default AddChapterForm