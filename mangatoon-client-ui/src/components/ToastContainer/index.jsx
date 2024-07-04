import { useDispatch, useSelector } from "react-redux"
import { toastActions, toastSelectors } from "../../features/toast.feature"
import Toast from "../Toast"
import { useEffect, useState } from "react"

function ToastContainer() {
    const dispatch = useDispatch()
    const toasts = useSelector(toastSelectors.selectAll)
    const [lastToast, setLastToast] = useState(null)

    useEffect(() => {
        if (toasts.length > 0) {
            if (lastToast) {
                if (lastToast.id != toasts[toasts.length - 1].id) {
                    setLastToast(toasts[toasts.length - 1])
                    setTimeout(() => {
                        dispatch(toastActions.removeToast(toasts[toasts.length - 1].id))
                    }, 3000 + toasts[toasts.length - 1].id*1000)
                }
            } else {
                setLastToast(toasts[0])
                setTimeout(() => {
                    dispatch(toastActions.removeToast(toasts[0].id))
                }, 3000 + toasts[0].id*1000)
            }
        } else {
            setLastToast(null)
        }
    }, [toasts])

    return (
        <div className='fixed top-8 right-8 z-[999999]'>
            {toasts
                && (
                    toasts.map(toast => {
                        return (
                            <Toast
                                key={toast.id}
                                type={toast.type}
                                title={toast.title}
                                message={toast.message}
                                duration={3000}
                            />
                        )
                    })
                )}
        </div>
    )
}

export default ToastContainer