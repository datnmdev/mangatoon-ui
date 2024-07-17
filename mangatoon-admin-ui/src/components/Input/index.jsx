import { forwardRef } from "react"

function Input({ 
    id, 
    type = 'text',
    name = '',
    value = '', 
    placeholder,
    disabled, 
    onChange = e => {},
    onBlur,
    onFocus,
    sx,
    isValid = true,
    max = ''
}, ref) { 
    return (
        <input
            ref={ref}
            className="block w-full px-4 py-1.5 border-[1px] rounded-[4px] focus:outline-[#000]"
            type={type}
            name={name}
            id={id}
            value={value}
            placeholder={placeholder}
            disabled={disabled}
            onChange={onChange}
            onBlur={onBlur}
            onFocus={onFocus}
            style={{
                ...sx,
                borderColor: isValid ? '#E4E7EB' : 'red'
            }}
            max={max}
        />
    )
}

export default forwardRef(Input)