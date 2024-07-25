function IconButton({
    icon = (<i className="fa-solid fa-arrows-rotate"></i>),
    content = 'Button',
    children = '',
    height = '38px',
    minWidth = '84px',
    color = '#fff',
    backgroundColor = '#0BA5E9',
    sx = {},
    disabled = false,
    onClick
}) {
    return (
        <button
            className="px-4 py-1 bg-sky-500 text-white font-normal rounded-[8px] flex justify-center items-center hover:opacity-80"
            style={{
                height,
                minWidth,
                color,
                backgroundColor: disabled ? '#ccc' : backgroundColor,
                cursor: disabled ? 'not-allowed' : 'pointer',
                ...sx
            }}
            disabled={disabled}
            onClick={onClick}
        >
            <span
                className="text-[1.2rem]"
            >
                {icon}
            </span>

            <span className="ml-1 line-clamp-1">{children || content}</span>
        </button>
    )
}

export default IconButton