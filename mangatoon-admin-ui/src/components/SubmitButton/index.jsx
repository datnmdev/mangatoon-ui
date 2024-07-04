import { IDLE, PENDING } from "../../constants/fetchStatus"
import Spinner from "../Spinner"

function SubmitButton({
    isInvalid = true,
    status = IDLE,
    onSubmit,
    height = '38px',
    minWidth = '84px',
    color = '#fff',
    backgroundColor = '#60D07F',
    content = 'Button'
}) {
    return (
        <button
            className={
                "px-4 py-2 w-full rounded-[8px] text-white font-[600] flex justify-center items-center"
                + ` ${isInvalid ? 'opacity-80 cursor-not-allowed' : null}`
            }
            style={{
                color,
                backgroundColor,
                minWidth,
                height
            }}
            disabled={(status === PENDING || isInvalid) ? true : false}
            onClick={onSubmit}
        >
            <div className={
                "flex items-center"
                + ` ${status === PENDING ? 'inline-block' : 'hidden'}`
            }>
                <Spinner
                    size="24px"
                />
            </div>

            <div className="ml-2">
                {content}
            </div>
        </button>
    )
}

export default SubmitButton