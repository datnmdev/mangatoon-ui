import { useState } from "react"

function Button({
    children,
    content,
    backgroundColor = '#F08121',
    color = 'white',
    disabled = false,
    sx = {},
    onClick = (e) => {}
}) {
    const [style, setStyle] = useState({})

    return (
        <button
            className="px-4 py-2 min-w-32 rounded-[8px] font-[500] hover:opacity-60"
            style={{
                color,
                backgroundColor: disabled ? '#ccc' : backgroundColor,
                cursor: disabled ? 'not-allowed' : 'pointer',
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
            {children || content}
        </button>
    )
}

export default Button