import { memo, useEffect, useState } from "react"
import Window from "./components/Window"

function InlineWindow({
    title,
    isOpenWindow,
    children 
}) {
    const [state, setState] = useState({
        isOpen: false
    })

    function onCloseClicked() {
        setState({
            ...state,
            isOpen: false
        })
    }

    useEffect(() => {
        setState({
            ...state,
            isOpen: isOpenWindow
        })
    }, [isOpenWindow])

    if (!state.isOpen) {
        return null
    }

    return (
        <div className="fixed w-full h-[100vh] top-0 left-0 z-[999999]">
            <div className="absolute top-0 left-0 w-full h-full bg-[#e8ebed66]"></div>

            <div className="absolute w-full h-full flex justify-center items-center z-[9999] overflow-hidden">
                <div className="animate-fadeIn flex justify-center">
                    <Window
                        title={title}
                        onCloseClicked={onCloseClicked}
                    >
                        {children}
                    </Window>
                </div>
            </div>
        </div>
    )
}

export default memo(InlineWindow)