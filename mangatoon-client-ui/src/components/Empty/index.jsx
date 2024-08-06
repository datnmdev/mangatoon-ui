import { memo } from "react"

function Empty() {
    return (
        <div className="min-h-[240px] bg-white flex flex-col justify-center items-center space-y-2">
            <img 
                className="w-12"
                src="/icons/empty-list.png" 
                alt="Empty Icon" 
            />

            <span className="text-[1.2rem] font-[450] opacity-60">Không có dữ liệu</span>
        </div>
    )
}

export default memo(Empty)