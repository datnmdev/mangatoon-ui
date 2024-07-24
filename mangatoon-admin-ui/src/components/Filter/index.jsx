import { useState } from "react"
import Tree from "./components/Tree"
import { useEffect } from "react"
import { memo } from "react"
import { useRef } from "react"

function Filter({
    data,
    onChange = value => { }
}) {
    const [hidden, setHidden] = useState(true)
    const [value, setValue] = useState(null)
    const boxRef = useRef(null)

    useEffect(() => {
        if (onChange) {
            onChange(value)
        }
    }, [value])

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (boxRef.current && !boxRef.current.contains(event.target)) {
                setHidden(true)
            }
        }

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [])

    return (
        <div
            ref={boxRef}
            className="px-4 py-2 bg-[#E8EBED] rounded-[8px] relative"
        >
            <div
                className="flex items-center space-x-2 cursor-pointer hover:opacity-60"
                onClick={() => setHidden(!hidden)}
            >
                <div className="text-[1.2rem]">
                    <i className="fa-solid fa-filter"></i>
                </div>

                <div>Bộ Lọc</div>
            </div>

            <div
                className="absolute top-[calc(100%+8px)] right-0 min-w-[320px] bg-white shadow-[0_0_8px_rgba(0,0,0,0.4)] rounded-[8px] p-4 z-[1]"
                style={{
                    display: !hidden ? 'block' : 'none'
                }}
            >
                <div className="font-[500] space-x-2">
                    <span className="text-[1.2rem]">
                        <i className="fa-solid fa-filter"></i>
                    </span>
                    <span>TUỲ CHỌN LỌC</span>
                </div>

                <div className="mt-1.5">
                    <Tree
                        data={data}
                        onChange={data => setValue(data)}
                    />
                </div>
            </div>
        </div>
    )
}

export default memo(Filter)