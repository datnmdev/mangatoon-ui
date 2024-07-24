import { useDispatch } from "react-redux"
import { FAILED, PENDING } from "../../constants/fetchStatus.constant"
import { toastActions } from "../../features/toast.feature"
import { ERROR } from "../Toast/constants"
import Spinner from "../Spinner"

function Loader({ 
    status, 
    children,
    errMessage = 'Lỗi không xác định. Vui lòng thử lại'
}) {
    const dispatch = useDispatch()

    if (status === PENDING) {
        return (
            <div className="absolute top-0 left-0 w-full h-full z-50">
                <div className="absolute top-0 left-0 w-full h-full bg-[rgba(245,241,241,0.6)]"></div>
                <div className="h-full flex justify-center items-center">
                    <Spinner />
                </div>
            </div>
        )
    } else if (status === FAILED) {
        dispatch(toastActions.addToast({
            type: ERROR,
            title: 'Đã xảy ra lỗi',
            message: errMessage
        }))
    }

    return children
}

export default Loader