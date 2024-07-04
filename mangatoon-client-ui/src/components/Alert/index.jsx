import { ERROR, INFO, WARNING } from "./constants"

function Alert({ 
    children,
    type = INFO
}) {

    let backgroundColor = '#D9ECF7'
    if (type === WARNING) {
        backgroundColor = 'yellow'
    } else if (type === ERROR) {
        backgroundColor = 'red'
    }

    return (
        <div 
            className="text-white text-center px-4 py-2 rounded-[4px]"
            style={{
                backgroundColor
            }}
        >
            {children}
        </div>
    )
}   

export default Alert