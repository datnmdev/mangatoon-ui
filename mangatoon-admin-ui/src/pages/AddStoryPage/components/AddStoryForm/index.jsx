import { useEffect, useState } from "react"
import Button from "../../../../components/Button"
import CoverImageUploader from "../../../../components/CoverImageUploader"
import Input from "../../../../components/Input"
import SelectSearch from "../../../../components/SelectSearch"
import TextEditor from "../../../../components/TextEditor"
import { DELETED } from "../../../SignInPage/constants/accountStatus.constant"
import { FINISHED, IN_PROGRESS, SUSPENDED, UNPUBLISHED } from "../../../StoryManagementPage/components/StoryList/constants"
import useGetCountries from "./hooks/useGetCountries"
import { PENDING, SUCCEEDED } from "../../../../constants/fetchStatus.constant"
import useCreateStory from "./hooks/useCreateStory"
import { useDispatch } from "react-redux"
import { toastActions } from "../../../../features/toast.feature"
import { ERROR, SUCCESS } from "../../../../components/Toast/constants"

const statusOptions = [
    {
        name: 'UNPUBLISHED',
        value: UNPUBLISHED
    },
    {
        name: 'IN_PROGRESS',
        value: IN_PROGRESS
    },
    {
        name: 'SUSPENDED',
        value: SUSPENDED
    },
    {
        name: 'FINISHED',
        value: FINISHED
    },
    {
        name: 'DELETED',
        value: DELETED
    }
]

function AddStoryForm() {
    const dispatch = useDispatch()
    const [file, setFile] = useState(undefined)
    const [data, setData] = useState({
        title: '',
        description: '',
        status: statusOptions[0],
        country: undefined,
        coverImage: undefined
    })
    const [resetCoverImage, setResetCoverImage] = useState({
        value: false
    })
    const { data: countryData, status: getCountriesStatus, setSubmit: setGetCountriesSubmit } = useGetCountries()
    const [formData, setFormData] = useState(null)
    const { data: createStoryData, status: createStoryStatus, setSubmit: setCreateStorySubmit } = useCreateStory(formData)

    function validate() {
        for (let key in data) {
            if (key === 'description') {
                if (!data[key]) {
                    continue
                } 
            } else {
                if (!data[key]) {
                    return false
                }
            }
        }
        return true
    }

    useEffect(() => {
        setGetCountriesSubmit(true)
    }, [])

    useEffect(() => {
        if (file) {
            setData({
                ...data,
                coverImage: file
            })
        }
    }, [file])

    useEffect(() => {
        const _formData = new FormData()
        _formData.append('title', data.title)
        _formData.append('description', data.description)
        _formData.append('status', String(data.status?.value))
        _formData.append('countryId', String(data.country?.value))
        _formData.append('coverImage', data.coverImage)
        setFormData(_formData)
    }, [data])

    useEffect(() => {
        if (createStoryStatus === SUCCEEDED) {
            if (createStoryData.data) {
                dispatch(toastActions.addToast({
                    type: SUCCESS,
                    title: 'Thêm truyện thành công!',
                    message: `Thông tin bộ truyện ${createStoryData.data.title} đã được lưu vào cơ sở dữ liệu`
                }))
                setData({
                    ...data,
                    id: createStoryData.data.id
                })
            } else {
                dispatch(toastActions.addToast({
                    type: ERROR,
                    title: 'Thêm truyện không thành công!',
                    message: 'Đã xảy ra lỗi. Vui lòng thử lại'
                }))
            }
        }
    }, [createStoryStatus])

    return (
        <div className="space-y-2">
            <div className="flex justify-between items-center">
                <div>
                    <div className="text-[1.4rem] font-[600]">Thêm Truyện</div>
                </div>
            </div>

            <div>
                <div className="flex justify-between items-center space-x-8">
                    <div className="grow space-y-6">
                        <div>
                            <div className="mb-1">Id</div>
                            <Input
                                disabled={true}
                                value={data?.id}
                            />
                        </div>

                        <div>
                            <div className="mb-1">Title</div>
                            <Input
                                placeholder='Nhập tiêu đề truyện...'
                                value={data.title}
                                onChange={(e) => setData({
                                    ...data,
                                    title: e.target.value
                                })}
                            />
                        </div>

                        <div>
                            <div className="mb-1">Description</div>
                            <TextEditor
                                placeholder="Nhập nội dung truyện..."
                                value={data.description}
                                onChange={value => setData({
                                    ...data,
                                    description: value
                                })}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <div className="mb-1">Country</div>
                                <SelectSearch
                                    placeholder="Chọn quốc gia"
                                    options={getCountriesStatus === SUCCEEDED ? countryData.data.map(country => ({
                                        name: country.name,
                                        value: country.id
                                    })) : []}
                                    value={data.country}
                                    onChange={option => setData({
                                        ...data,
                                        country: option
                                    })}
                                />
                            </div>

                            <div>
                                <div className="mb-1">Status</div>
                                <SelectSearch
                                    placeholder="Chọn trạng thái"
                                    value={data.status}
                                    options={statusOptions}
                                    onChange={option => setData({
                                        ...data,
                                        status: option
                                    })}
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <CoverImageUploader
                            reset={resetCoverImage}
                            onChange={file => setFile(file)}
                        />
                        <div className="mt-4 text-center italic">
                            <div>Định dạng: jpg, jpeg, png</div>
                            <div>Kích thước: không quá 10MB</div>
                        </div>
                    </div>
                </div>

                <div className="mt-4 space-x-2">
                    <Button
                        backgroundColor="#41c035"
                        disabled={!validate() || (createStoryStatus === PENDING)}
                        onClick={() => setCreateStorySubmit(true)}
                    >
                        Thêm
                    </Button>

                    <Button
                        onClick={() => {
                            setData({
                                title: '',
                                description: '',
                                status: statusOptions[0],
                                country: undefined,
                                coverImage: undefined
                            })
                            setResetCoverImage({
                                value: true
                            })
                        }}
                    >
                        Làm mới
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default AddStoryForm