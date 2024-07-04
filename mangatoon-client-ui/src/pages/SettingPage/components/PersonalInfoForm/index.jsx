import { useEffect, useState } from "react"
import { useSelector } from 'react-redux'
import moment from 'moment'
import Input from "../../../../components/Input"
import Select from "../../../../components/Select"
import { userSelectors } from "../../../../features/user.feature"

function PersonalInfoForm({
    onChange = data => {}
}) {
    const profile = useSelector(userSelectors.selectProfile)
    const [data, setData] = useState(profile)

    useEffect(() => {
        setData(profile)
    }, [profile])

    useEffect(() => {
        if (onChange) {
            onChange(data)
        }
    }, [data])

    return (
        <div className="space-y-2">
            <div className="space-y-1">
                <div>Họ và tên</div>
                <Input 
                    value={data?.name}
                    onChange={e => setData({
                        ...data,
                        name: e.target.value
                    })}
                />
            </div>

            <div className="space-y-1">
                <div>Ngày sinh</div>
                <Input 
                    type='date'
                    value={data?.dob ? moment(data?.dob).format('YYYY-MM-DD') : ''}
                    onChange={e => setData({
                        ...data,
                        dob: e.target.value
                    })}
                />
            </div>

            <div className="space-y-1">
                <div>Giới tính</div>
                <Select
                    sx={{
                        width: '100%'
                    }}
                    value={data?.gender}
                    options={([
                        {
                            name: 'Nam',
                            value: 0
                        },
                        {
                            name: 'Nữ',
                            value: 1
                        }
                    ])}
                    onChange={e => setData({
                        ...data,
                        gender: Number(e.target.value)
                    })}
                />
            </div>
        </div>
    )
}

export default PersonalInfoForm