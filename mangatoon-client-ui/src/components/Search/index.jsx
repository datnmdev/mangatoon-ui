import { useState } from "react"
import colors from "../../assets/colors"

function Search({
    placeholder = '',
    theme = {
        primaryColor: colors.primaryColor,
        textColor: colors.textColor
    },
    onChange,
    onSubmit
}) {
    const [inputStyle, setInputStyle] = useState({})

    return (
        <div className="min-w-[280px] relative">
            <input
                type="text"
                className="px-4 py-2 border-[2px] rounded-[16px] pr-[48px] w-full"
                style={inputStyle}
                placeholder={placeholder}
                onFocus={() => setInputStyle({
                    outlineColor: theme.primaryColor
                })}
                onChange={onChange}
                required={true}
            />

            <button 
                className="absolute top-0 right-0 w-[48px] h-full text-[1.2rem]"
                style={{
                    color: theme.primaryColor
                }}
            >
                <i className="fa-solid fa-magnifying-glass"></i>
            </button>
        </div>
    )
}

export default Search