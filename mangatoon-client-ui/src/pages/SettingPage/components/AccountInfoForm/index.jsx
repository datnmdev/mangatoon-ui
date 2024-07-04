import { useEffect } from "react"
import moment from 'moment'
import Input from "../../../../components/Input"
import useGetAccountInfo from "./hooks/useGetAccountinfo"
import { SUCCEEDED } from "../../../../constants/fetchStatus.constant"

function AccountInfoForm() {
    const { data: getAccountInfoData, status: getAccountInfoStatus, setSubmit: setGetAccountInfoSubmit } = useGetAccountInfo()

    useEffect(() => {
            setGetAccountInfoSubmit(true)
    }, [])

    if (getAccountInfoStatus === SUCCEEDED) {
        return (
            <div className="space-y-2">
                <div className="space-y-1">
                    <div>Id</div>
                    <Input
                        value={getAccountInfoData?.data?.id}
                        disabled={true}
                    />
                </div>

                <div className="space-y-1">
                    <div>Tình trạng</div>
                    <Input
                        value={getAccountInfoData?.data?.status === 1 && 'Đã kích hoạt'}
                        disabled={true}
                    />
                </div>

                <div className="space-y-1">
                    <div>Ngày tạo</div>
                    <Input
                        value={moment(getAccountInfoData?.data?.createdAt).format('DD/MM/YYYY')}
                        disabled={true}
                    />
                </div>
            </div>
        )
    }
}

export default AccountInfoForm