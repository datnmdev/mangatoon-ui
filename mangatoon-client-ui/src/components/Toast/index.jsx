import { forwardRef, memo } from "react";
import { SUCCESS } from "./constants"
import './index.css'
import { useDispatch } from "react-redux";
import { toastActions } from "../../features/toast.feature";

const icons = {
    success: "fas fa-check-circle",
    info: "fas fa-info-circle",
    warning: "fas fa-exclamation-circle",
    error: "fas fa-exclamation-circle"
  };

function Toast({
    id,
    title = 'Thông báo',
    message = 'Bạn đã thao tác thành công',
    type = SUCCESS,
    duration = 3000
}) {
    const dispatch = useDispatch()

    return (
        <div
            className={`toast toast--${type}`}
            style={{
                animation: `slideInLeft ease ${duration / 10000}s, fadeOut linear 1s ${duration / 1000}s forwards`
            }}
        >
            <div className="toast__icon">
                <i className={`${icons[type]}`}></i>
            </div>
            <div className="toast__body">
                <h3 className="toast__title">{title}</h3>
                <p className="toast__msg">{message}</p>
            </div>
            <div 
                className="toast__close"
                onClick={() => dispatch(toastActions.removeToast(id))}
            >
                <i className="fas fa-times"></i>
            </div>
        </div>
    )
}

export default memo(Toast)