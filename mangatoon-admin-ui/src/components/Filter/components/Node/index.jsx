import { useState } from "react";
import { CHECKBOX, RADIO } from "../constants";
import { useEffect } from "react";
import { memo } from "react";

function Node({
    data,
    onChange = (value) => { }
}) {
    const [checkedValues, setCheckedValues] = useState([])

    useEffect(() => {
        let value
        switch (data.valueType) {
            case 'number':
                value = checkedValues.map(checkedValue => Number(checkedValue))
                break
            default:
                value = checkedValues
        }

        if (onChange) {
            if (data.type === CHECKBOX) {
                onChange(value)
            } else if (data.type === RADIO) {
                onChange(value?.[0])
            }
        }
    }, [checkedValues])

    function handleChange(event) {
        const { value, checked } = event.target
        if (checked) {
            if (data.type === CHECKBOX) {
                setCheckedValues([
                    ...checkedValues,
                    value
                ])
            } else {
                setCheckedValues([
                    value
                ])
            }
        } else {
            setCheckedValues(checkedValues.filter((item) => item !== value))
        }
    }

    return (
        <div>
            <div className="font-[500]">{data.name}</div>

            <div className="flex flex-col ml-4 space-y-1 mt-1">
                {data.options.map((option, index) => {
                    return (
                        <label
                            key={index}
                            htmlFor={option.value}
                            className="space-x-1"
                        >
                            <input
                                id={option.value}
                                name={data.group}
                                type={data.type}
                                value={option.value}
                                onChange={handleChange}
                            />
                            <span className="select-none">{option.title}</span>
                        </label>
                    )
                })}
            </div>
        </div>
    )
}

export default memo(Node)