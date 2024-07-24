function IconButton({
    icon = (<i className="fa-solid fa-arrows-rotate"></i>),
    content = 'Button',
    height = '38px',
    minWidth = '84px',
    color = '#fff',
    backgroundColor = '#0BA5E9',
    sx = {},
    onClick
}) {
    return (
        <button
            className="px-4 py-1 bg-sky-500 text-white font-[600] rounded-[8px] flex justify-center items-center hover:opacity-80"
            style={{
                height,
                minWidth,
                color,
                backgroundColor,
                ...sx
            }}
            onClick={onClick}
        >
            <span
                className="text-[1.2rem]"
            >
                {icon}
            </span>

            <span className="ml-1 line-clamp-1">{content}</span>
        </button>
    )
}

export default IconButton