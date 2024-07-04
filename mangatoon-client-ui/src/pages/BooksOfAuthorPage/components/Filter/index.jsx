import { useEffect, useState } from "react"
import BorderedButton from "../../../../components/BorderedButton"

function Filter({
    value,
    onChange
}) {
    const [data, setData] = useState(value)

    useEffect(() => {
        if (onChange) {
            onChange(data)
        }
    }, [data])

    return (
        <div className="bg-white p-6 rounded-[6px] space-y-2">
            <div className="flex items-center">
                <div className="w-[148px]">
                    Tình trạng
                </div>

                <div className="flex items-center space-x-2">
                    <BorderedButton
                        active={data.status === 1}
                        onClick={() => setData({
                            ...data,
                            status: 1
                        })}
                    >
                        Đang tiến hành
                    </BorderedButton>

                    <BorderedButton
                        active={data.status === 2}
                        onClick={() => setData({
                            ...data,
                            status: 2
                        })}

                    >
                        Đang tạm hoãn
                    </BorderedButton>

                    <BorderedButton
                        active={data.status === 3}
                        onClick={() => setData({
                            ...data,
                            status: 3
                        })}
                    >
                        Đã hoàn thành
                    </BorderedButton>
                </div>
            </div>
        </div>
    )
}

export default Filter