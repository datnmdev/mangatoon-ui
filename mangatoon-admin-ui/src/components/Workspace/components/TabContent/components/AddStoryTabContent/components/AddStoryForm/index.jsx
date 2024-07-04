import { useEffect, useState } from "react";
import SelectSearch from "../../../../../../../SelectSearch";
import TextEditor from "../../../../../../../TextEditor"
import TextInput from "../../../../../../../TextInput"
import ImageUploader from "../../../../../../../ImageUploader";
import { useDispatch, useSelector } from "react-redux";
import { workspaceActions, workspaceAsyncThunks, workspaceSelectors } from "../../../../../../../../features/workspace/workspaceSlice";
import SubmitButton from "../../../../../../../SubmitButton";
import { DELETED, FINISHED, IN_PROGRESS, SUSPENDED, UNPUBLISHED } from "../../../../../../../../constants/storyStatus";
import { FAILED, IDLE, PENDING, SUCCEEDED } from "../../../../../../../../constants/fetchStatus";

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

function AddStoryForm({
    onCreated,
    onResponseData
}) {
    const dispatch = useDispatch()
    const selectAddStoryFormData = useSelector(workspaceSelectors.storySelectors.selectAddStoryFormData)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [country, setCountry] = useState(null)
    const [status, setStatus] = useState(statusOptions[0])
    const countries = useSelector(workspaceSelectors.countrySelectors.selectCountries)
    const [countryOptions, setCountryOptions] = useState([])
    const [coverImage, setCoverImage] = useState(null)
    const [coverImageUrl, setCoverImageUrl] = useState('')
    const [createStoryStatus, setCreateStoryStatus] = useState(IDLE)
    const createStoryData = useSelector(workspaceSelectors.storySelectors.selectCreateStory)
    const [isCreatedStory, setCreatedStory] = useState(false)

    function validate(title, country, coverImage) {
        if (title.length <= 0) {
            return false
        }

        if (!country) {
            return false
        }

        if (!coverImage) {
            return false
        }

        return true
    }

    async function onAddStorySubmit() {
        const data = new FormData()
        data.append('title', title)
        data.append('description', description)
        data.append('status', String(status.value))
        data.append('coverImage', coverImage)
        data.append('countryId', String(country.value))

        try {
            setCreateStoryStatus(PENDING)
            await dispatch(workspaceAsyncThunks.story.createStory(data)).unwrap()
            setCreateStoryStatus(SUCCEEDED)
        } catch (error) {
            setCreateStoryStatus(FAILED)
        }
    }

    useEffect(() => {
        if (countries) {
            setCountryOptions(countries.map(country => ({
                name: country.name,
                value: country.id
            })))
        }
    }, [countries])

    useEffect(() => {
        async function getCountries() {
            await dispatch(workspaceAsyncThunks.country.getCountries()).unwrap()
        }

        if (countryOptions.length <= 0) {
            getCountries()
        }
    }, [])

    useEffect(() => {
        if (createStoryStatus === SUCCEEDED) {
            if (createStoryData.data) {
                setCreatedStory(true)
            }
        }
    }, [createStoryStatus])

    useEffect(() => {
        const data = {
            title,
            description,
            country,
            countryOptions,
            status,
            coverImageUrl,
            createStoryStatus,
            isCreatedStory
        }
        dispatch(workspaceActions.saveAddStoryFormData(data))
    }, [title, description, country, countryOptions, status, createStoryStatus, isCreatedStory, coverImageUrl])

    useEffect(() => {
        if (coverImage) [
            setCoverImageUrl(URL.createObjectURL(coverImage))
        ]
    }, [coverImage])

    useEffect(() => {
        if (createStoryData) {
            setCoverImageUrl(`${import.meta.env.VITE_API_GATEWAY_URL}/story-api/${createStoryData.data.coverImageUrl}`)
        }
    }, [createStoryData])

    useEffect(() => {
        if (selectAddStoryFormData) {
            setTitle(selectAddStoryFormData.title)
            setDescription(selectAddStoryFormData.description)
            setCountry(selectAddStoryFormData.country)
            setCountryOptions(selectAddStoryFormData.countryOptions)
            setStatus(selectAddStoryFormData.status)
            setCoverImageUrl(selectAddStoryFormData.coverImageUrl)
            setCreateStoryStatus(selectAddStoryFormData.createStoryStatus)
            setCreatedStory(selectAddStoryFormData.isCreatedStory)
        }
    }, [])

    useEffect(() => {
        if (onCreated) {
            onCreated(isCreatedStory)
        }
    }, [isCreatedStory])

    useEffect(() => {
        if (onResponseData) {
            onResponseData(createStoryData)
        }
    }, [createStoryData])

    return (
        <div>
            <div className="flex justify-between items-center">
                <div>
                    <div className="text-[1.4rem] font-[600]">Thông tin chính</div>
                </div>

                <div className="mt-6">
                    <SubmitButton
                        isInvalid={!validate(title, country, coverImage) || isCreatedStory}
                        content={isCreatedStory ? 'Đã thêm' : 'Thêm'}
                        status={createStoryStatus}
                        onSubmit={onAddStorySubmit}
                    />
                </div>
            </div>

            <div>
                <div className="flex justify-between items-center space-x-8">
                    <div className="grow space-y-6">
                        {isCreatedStory
                            && (
                                <div>
                                    <div className="mb-1">Id</div>
                                    <TextInput
                                        value={createStoryData.data.id}
                                        disabled={true}
                                    />
                                </div>
                            )}


                        <div>
                            <div className="mb-1">Title</div>
                            <TextInput
                                placeholder='Nhập tiêu đề truyện...'
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                disabled={isCreatedStory}
                            />
                        </div>

                        <div>
                            <div className="mb-1">Description</div>
                            <TextEditor
                                placeholder="Nhập nội dung truyện..."
                                value={description}
                                onChange={(value) => setDescription(value)}
                                disabled={isCreatedStory}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <div className="mb-1">Country</div>
                                <SelectSearch
                                    options={countryOptions}
                                    value={country}
                                    placeholder="Chọn quốc gia"
                                    onChange={(option) => setCountry(option)}
                                    disabled={isCreatedStory}
                                />
                            </div>

                            <div>
                                <div className="mb-1">Status</div>
                                <SelectSearch
                                    disabled={true}
                                    value={status}
                                    options={statusOptions}
                                    placeholder="Chọn trạng thái"
                                    onChange={(option) => setStatus(option)}
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <ImageUploader
                            previewUrl={coverImageUrl}
                            disabled={isCreatedStory}
                            onChange={file => setCoverImage(file)}
                        />
                        <div className="mt-4 text-center italic">
                            <div>Định dạng: jpg, jpeg, png</div>
                            <div>Kích thước: không quá 10MB</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddStoryForm