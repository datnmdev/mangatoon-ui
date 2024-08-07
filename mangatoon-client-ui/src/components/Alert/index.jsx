import { memo } from "react"
import { ERROR, INFO, WARNING } from "./constants"

function Alert({ 
    children,
    type = INFO,
    textAlign = 'center'
}) {

    let backgroundColor = '#D9ECF7'
    if (type === WARNING) {
        backgroundColor = 'yellow'
    } else if (type === ERROR) {
        backgroundColor = 'red'
    }

    return (
        <div 
            className="text-white px-4 py-2 rounded-[4px]"
            style={{
                backgroundColor,
                textAlign
            }}
        >
            {children}
        </div>
    )
}   

export default memo(Alert)