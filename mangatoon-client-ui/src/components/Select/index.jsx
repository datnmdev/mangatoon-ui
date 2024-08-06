import { memo } from "react"

function Select({
    options,
    value,
    onChange,
    sx = {}
}) {
    return (
        <select
            className="border-[1px] px-4 py-1.5 rounded-[4px]"
            value={value}
            onChange={onChange}
            style={sx}
        >
            {options
                && (
                    options.map(option => {
                        return (
                            <option 
                                key={option.value}
                                value={option.value}
                            >
                                {option.name}
                            </option>
                        )
                    })
                )}
        </select>
    )
}

export default memo(Select)