import { FAILED, PENDING, SUCCEEDED } from "../../constants/fetchStatus"
import Spinner from "../Spinner"
import SubmitErrorMessage from "../SubmitErrorMessage"

function Loader({ status, children }) {
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
        return (
            <SubmitErrorMessage
                content={'Đã xảy ra lỗi. Vui lòng tải lại trang...'}
            />
        )
    }

    return (
        <>
            {children}
        </>
    )
}

export default Loader