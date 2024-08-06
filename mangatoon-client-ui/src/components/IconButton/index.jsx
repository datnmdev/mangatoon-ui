import { memo, useState } from "react"

function IconButton({
    icon = (<i className="fa-solid fa-book-open"></i>),
    children,
    color = 'white',
    backgroundColor = '#8bc34a',
    sx = {},
    disabled = false,
    onClick = (e) => {}
}) {
    const [style, setStyle] = useState({})

    return (
        <button 
            className="px-4 py-2.5 rounded-[4px] text-white text-[1.05rem] line-clamp-1"
            style={{
                color,
                cursor: disabled ? 'not-allowed' : 'pointer',
                backgroundColor: disabled ? '#ccc' : backgroundColor,
                ...style,
                ...sx
            }}
            disabled={disabled}
            onMouseEnter={() => setStyle({
                opacity: 0.8
            })}
            onMouseLeave={() => setStyle({
                opacity: 1
            })}
            onClick={onClick}
        >
            <span>
                {icon}
            </span>

            <span
                style={{
                    marginLeft: children ? '8px' : '0'
                }}
            >
                {children}
            </span>
        </button>
    )
}

export default memo(IconButton)