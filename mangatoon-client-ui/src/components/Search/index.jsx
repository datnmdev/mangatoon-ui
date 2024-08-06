import { memo, useState } from "react"

function Search({
    placeholder = '',
    onFocus = e => {},
    onBlur = e => {},
    sx = {},
    onChange
}) {
    const [inputStyle, setInputStyle] = useState({})

    function _onFocus() {
        setInputStyle({
            outlineColor: '#F08121'
        })
        onFocus()
    }

    return (
        <div className="min-w-[360px] relative">
            <input
                type="text"
                className="px-4 py-2 border-[2px] rounded-[8px] pr-[48px] w-full"
                style={{
                    ...inputStyle,
                    ...sx
                }}
                placeholder={placeholder}
                onFocus={_onFocus}
                onBlur={onBlur}
                onChange={onChange}
                required={true}
            />

            <button 
                className="absolute top-0 right-0 w-[48px] h-full text-[1.2rem]"
                style={{
                    color: 'white'
                }}
            >
                <i className="fa-solid fa-magnifying-glass"></i>
            </button>
        </div>
    )
}

export default memo(Search)