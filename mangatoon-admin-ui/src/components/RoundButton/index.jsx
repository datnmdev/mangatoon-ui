import { useState } from "react"

function RoundButton({ 
    icon = (<i className="fa-solid fa-pen"></i>), 
    size = '24px', 
    color = '#0084C7',
    sx = {},
    onClick,
    onMouseEnter = () => {},
    onMouseLeave = () => {}
}) {
    const [style, setStyle] = useState({})

    return (
        <button 
            className="flex justify-center items-center hover:bg-[#E8EBED] rounded-[50%] transition-all duration-100"
            style={{
                width: size,
                height: size,
                color,
                ...sx,
                ...style
            }}
            onClick={onClick}
            onMouseEnter={(e) => onMouseEnter(e, setStyle)}
            onMouseLeave={(e) => onMouseLeave(e, setStyle)}
        >
            {icon}
        </button>
    )
}

export default RoundButton