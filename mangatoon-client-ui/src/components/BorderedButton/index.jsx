import { memo } from "react"

function BorderedButton({ 
    children,
    active = false,
    onClick = e => {}
}) {
    return (
        <button
            className='block px-4 py-1 rounded-[4px] border-[1px] border-[#F08121] text-[#F08121] hover:text-white hover:bg-[#F08121]'
            style={{
                color: active ? 'white' : '',
                backgroundColor: active ? '#F08121' : ''
            }}
            onClick={onClick}
        >
            {children}
        </button>
    )
}

export default memo(BorderedButton)