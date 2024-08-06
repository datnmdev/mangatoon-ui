import { memo } from "react"

function ErrorMessage({ children }) {
    return (
        <div className="text-red-500 py-2 rounded-[12px]">{children}</div>
    )
}

export default memo(ErrorMessage)