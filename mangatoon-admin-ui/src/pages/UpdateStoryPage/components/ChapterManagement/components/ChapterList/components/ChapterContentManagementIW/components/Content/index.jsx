import { useEffect, useState } from "react"
import IconButton from "../../../../../../../../../../components/IconButton"
import useGetChapterImages from "./hooks/useGetChapterImages"
import { SUCCEEDED } from "../../../../../../../../../../constants/fetchStatus.constant"
import Item from "./components/Item"
import Previewer from "./components/Previewer"
import Input from "../../../../../../../../../../components/Input"
import Button from "../../../../../../../../../../components/Button"
import UploaderButton from "../../../../../../../../../../components/UploaderButton"
import useCreateChapterImages from "./hooks/useCreateChapterImages"
import useDeleteChapterImageByChapterId from "./hooks/useDeleteChapterImageByChapterId"
import useDeleteChapterImageById from "./hooks/useDeleteChapterImageById"
import useUpdateChapterImage from "./hooks/useUpdateChapterImage"
import { useDispatch } from "react-redux"
import { toastActions } from "../../../../../../../../../../features/toast.feature"
import { ERROR, SUCCESS } from "../../../../../../../../../../components/Toast/constants"

function Content({
    chapter
}) {
    const dispatch = useDispatch()
    const { data: chapterImageData, status: getChapterImagesStatus, setSubmit: setGetChapterImagesSubmit } = useGetChapterImages({
        chapterId: chapter.id
    })
    const [selectedchapterImage, setSelectedChapterImage] = useState(undefined)
    const [order, setOrder] = useState('')
    const [files, setFiles] = useState({
        value: undefined
    })
    const [resetUploadButton, setResetUploadButton] = useState({
        value: false
    })
    const [createChapterImagesBody, setCreateChapterImageBody] = useState(undefined)
    const { data: createChapterImagesData, status: createChapterImagesStatus, setSubmit: setCreateChapterImagesSubmit } = useCreateChapterImages(createChapterImagesBody)
    const { data: deleteChapterImageByChapterIdData, status: deleteChapterImageByChapterIdStatus, setSubmit: setDeleteChapterImageByChapterIdSubmit } = useDeleteChapterImageByChapterId(chapter.id)
    const { data: deleteChapterImageByIdData, status: deleteChapterImageByIdStatus, setSubmit: setDeleteChapterImageByIdSubmit } = useDeleteChapterImageById(selectedchapterImage?.id)
    const { data: updateChapterImageData, status: updateChapterImageStatus, setSubmit: setUpdateChapterImageSubmit } = useUpdateChapterImage({
        id: selectedchapterImage?.id,
        order: isNaN(Number(order)) ? undefined : Number(order)
    })

    useEffect(() => {
        setGetChapterImagesSubmit(true)
    }, [])

    useEffect(() => {
        if (selectedchapterImage) {
            setOrder(selectedchapterImage.order)
        }
    }, [selectedchapterImage])

    useEffect(() => {
        if (files && files.length > 0) {
            const formData = new FormData()
            formData.append('chapterId', String(chapter.id))
            for (let file of files) {
                formData.append('chapterImages', file)
            }
            setCreateChapterImageBody(formData)
        }
    }, [files])

    useEffect(() => {
        if (createChapterImagesBody) {
            setCreateChapterImagesSubmit(true)
        }
    }, [createChapterImagesBody])

    useEffect(() => {
        if (createChapterImagesStatus === SUCCEEDED) {
            if (createChapterImagesData.data) {
                dispatch(toastActions.addToast({
                    type: SUCCESS,
                    title: 'Thêm nội dung thành công!',
                    message: 'Nội dung mới đã được cập nhật vào cơ sở dữ liệu.'
                }))
                setResetUploadButton({
                    value: true
                })
                setGetChapterImagesSubmit(true)
            } else {
                dispatch(toastActions.addToast({
                    type: ERROR,
                    title: 'Thêm nội dung không thành công!',
                    message: 'Tên các file chọn phải được đặt bằng chữ số thể hiện thứ tự của nội dung được hiển thị.'
                }))
            }
        }
    }, [createChapterImagesStatus])

    useEffect(() => {
        if (deleteChapterImageByChapterIdStatus === SUCCEEDED) {
            if (deleteChapterImageByChapterIdData.data) {
                dispatch(toastActions.addToast({
                    type: SUCCESS,
                    title: 'Xoá thành công!',
                    message: 'Đã xoá tất cả nội dung của chương.'
                }))
                setGetChapterImagesSubmit(true)
                setSelectedChapterImage(undefined)
            }
        }
    }, [deleteChapterImageByChapterIdStatus])

    useEffect(() => {
        if (deleteChapterImageByIdStatus === SUCCEEDED) {
            if (deleteChapterImageByIdData.data) {
                dispatch(toastActions.addToast({
                    type: SUCCESS,
                    title: 'Xoá thành công!',
                    message: 'Đã xoá nội dung của chương.'
                }))
                setGetChapterImagesSubmit(true)
                setSelectedChapterImage(undefined)
            }
        }
    }, [deleteChapterImageByIdStatus])

    useEffect(() => {
        if (updateChapterImageStatus === SUCCEEDED) {
            if (updateChapterImageData.data) {
                dispatch(toastActions.addToast({
                    type: SUCCESS,
                    title: 'Cập nhật thành công!',
                    message: 'Đã lưu lại những thay đổi vào cơ sở dữ liệu.'
                }))
                setGetChapterImagesSubmit(true)
            }
        }
    }, [updateChapterImageStatus])

    return (
        <div className="w-[80vw] h-[80vh] flex flex-col">
            <div className="flex space-x-2">
                <UploaderButton
                    reset={resetUploadButton}
                    onChange={files => setFiles(files)}
                >
                    <span className="text-[1.2rem]">
                        <i className="fa-solid fa-plus"></i>
                    </span>
                    <span>Thêm</span>
                </UploaderButton>

                <IconButton
                    onClick={() => setGetChapterImagesSubmit(true)}
                >
                    Refresh
                </IconButton>

                <IconButton
                    icon={(<i className="fa-regular fa-trash-can"></i>)}
                    backgroundColor="red"
                    onClick={() => setDeleteChapterImageByChapterIdSubmit(true)}
                >
                    Xoá tất cả
                </IconButton>
            </div>

            <div className="flex items-start justify-between grow mt-4 overflow-hidden">
                <div className="grow h-full flex flex-wrap -ml-2 -mt-2 w-1/2 overflow-auto">
                    {getChapterImagesStatus === SUCCEEDED
                        && (
                            chapterImageData.data.map(chapterImage => {
                                return (
                                    <div
                                        key={chapterImage.id}
                                        style={{
                                            border: chapterImage.id === selectedchapterImage?.id ? '4px solid rgb(33, 197, 93)' : 'none'
                                        }}
                                        onClick={() => setSelectedChapterImage(chapterImage)}
                                        className="ml-2 mt-2 cursor-pointer"
                                    >
                                        <Item
                                            chapterImageData={chapterImage}
                                        />
                                    </div>
                                )
                            })
                        )}
                </div>

                <div className="grow h-full w-[50%] flex flex-col justify-center overflow-hidden">
                    {selectedchapterImage
                        ? (
                            <div className="grow flex flex-col overflow-hidden space-y-2 px-2">
                                <div>
                                    <div>
                                        <div>Order</div>

                                        <div className="flex items-center space-x-2">
                                            <Input
                                                type="number"
                                                value={order}
                                                placeholder="Nhập vị trí..."
                                                onChange={e => setOrder(e.target.value)}
                                            />

                                            <Button
                                                backgroundColor="rgb(65, 192, 53)"
                                                onClick={() => setUpdateChapterImageSubmit(true)}
                                            >
                                                Cập nhật
                                            </Button>

                                            <Button
                                                backgroundColor="red"
                                                onClick={() => setDeleteChapterImageByIdSubmit(true)}
                                            >
                                                Xoá
                                            </Button>
                                        </div>
                                    </div>
                                </div>

                                <div className="grow overflow-hidden flex flex-col">
                                    <div>Preview</div>

                                    <div className="grow overflow-auto">
                                        <Previewer
                                            chapterImageData={selectedchapterImage}
                                        />
                                    </div>
                                </div>
                            </div>
                        )
                        : (
                            <div className="grow">
                                <div className="text-[12rem] text-[#ccc] flex justify-center items-center">
                                    <i className="fa-solid fa-image"></i>
                                </div>

                                <div className="text-center font-[600] text-[#ccc] mt-2">
                                    KHÔNG CÓ ẢNH NÀO ĐƯỢC CHỌN
                                </div>
                            </div>
                        )}
                </div>
            </div>

        </div>
    )
}

export default Content