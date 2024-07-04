import { useDispatch, useSelector } from "react-redux"
import Button from "../../../../components/Button"
import ImageUploader from "../../../../components/ImageUploader"
import AccountInfoForm from "../AccountInfoForm"
import PersonalInfoForm from "../PersonalInfoForm"
import { useEffect, useState } from "react"
import useUpdateProfile from "./hooks/useUpdateProfile"
import { PENDING, SUCCEEDED } from "../../../../constants/fetchStatus.constant"
import { userAsyncThunks, userSelectors } from "../../../../features/user.feature"

function AccountManagementTabContent() {
    const dispatch = useDispatch()
    const profile = useSelector(userSelectors.selectProfile)
    const [newProfile, setNewProfile] = useState(profile)
    const { data: updateProfileData, status: updateProfileStatus, setSubmit: setUpdateProfileSubmit } = useUpdateProfile(newProfile)

    useEffect(() => {
        if (updateProfileStatus === SUCCEEDED) {
            if (updateProfileData.data) {
                dispatch(userAsyncThunks.getProfile())
            }
        }
    }, [updateProfileStatus])

    return (
        <div className="space-y-8">
            <div className="flex justify-center">
                <ImageUploader 
                    src={newProfile?.avatarUrl || '/imgs/user-default.jpg'}
                    onChange={file => setNewProfile({
                        ...newProfile,
                        avatar: file
                    })}
                />
            </div>

            <div>
                <div className="font-[500] text-[1.2rem]">
                    Thông tin tài khoản
                </div>

                <div className="mt-4">
                    <AccountInfoForm />
                </div>
            </div>

            <div>
                <div className="font-[500] text-[1.2rem]">
                    Thông tin cá nhân
                </div>

                <div className="mt-4">
                    <PersonalInfoForm 
                        onChange={data => setNewProfile({
                            ...newProfile,
                            ...data
                        })}
                    />
                </div>
            </div>

            <div>
                <Button
                    onClick={() => setUpdateProfileSubmit(true)}
                    disabled={updateProfileStatus === PENDING}
                >
                    {updateProfileStatus === PENDING ? 'Đang lưu...' : 'Lưu thay đổi'}
                </Button>
            </div>
        </div>
    )
}

export default AccountManagementTabContent