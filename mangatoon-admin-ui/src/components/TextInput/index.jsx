function TextInput({ 
    id, 
    value, 
    placeholder,
    disabled, 
    onChange,
    onBlur,
    onFocus,
    sx
}) {
    return (
        <input
            className="block w-full px-4 py-3 border-[1px] rounded-[4px] focus:outline-[#000]"
            type="text"
            id={id}
            value={value}
            placeholder={placeholder}
            disabled={disabled}
            onChange={onChange}
            onBlur={onBlur}
            onFocus={onFocus}
            style={sx}
        />
    )
}

export default TextInput