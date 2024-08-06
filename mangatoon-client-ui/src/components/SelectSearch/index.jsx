import { memo, useEffect, useState } from "react"
import Input from "../Input"

function SelectSearch({
    options,
    value,
    placeholder = "Chọn quốc gia",
    disabled = false,
    onChange
}) {
    const [selectedOption, setSelectedOption] = useState(value || null)
    const [text, setText] = useState('')
    const [isFocus, setFocus] = useState(false)
    const [searchResut, setSearchResult] = useState(options)

    useEffect(() => {
        if (value) {
            setText(value.name)
            setSelectedOption(value)
        }
    }, [value])

    useEffect(() => {
        const result = options.filter(option => (new RegExp(`${text}`, 'gi')).test(option.name))
        setSearchResult(result)
    }, [text])

    useEffect(() => {
        if (onChange) {
            onChange(selectedOption)
        }
    }, [selectedOption])

    return (
        <div className="relative">
            <div className="relative">
                <Input
                    type="text"
                    value={text}
                    placeholder={placeholder}
                    onChange={(e) => setText(e.target.value)}
                    sx={{
                        paddingRight: '38px',
                        outline: 'none',
                        borderBottomLeftRadius: isFocus ? '0' : '4px',
                        borderBottomRightRadius: isFocus ? '0' : '4px'
                    }}
                    onFocus={() => {
                        setFocus(true)
                        setSearchResult(options)
                    }}
                    onBlur={() => {
                        setFocus(false)
                        setText(selectedOption ? selectedOption.name : '')
                    }}
                    disabled={disabled}
                />

                <div className="absolute top-1/2 -translate-y-1/2 right-4 text-[0.8rem]">
                    <i className="fa-solid fa-angle-down"></i>
                </div>
            </div>

            {isFocus
                && (
                    <ul className="absolute left-0 top-full w-full max-h-[240px] overflow-y-auto border-[1px] border-t-0 rounded-bl-[4px] rounded-br-[4px] bg-white z-10">
                        {searchResut.map((option, index) => {
                            return (
                                <li
                                    key={index}
                                    className="px-4 py-3 hover:bg-[#E8EBED] cursor-pointer"
                                    onMouseDown={() => {
                                        setText(option.name)
                                        setSelectedOption(option)
                                    }}
                                >
                                    {option.name}
                                </li>
                            )
                        })}
                    </ul>
                )}
        </div>
    )
}

export default memo(SelectSearch)