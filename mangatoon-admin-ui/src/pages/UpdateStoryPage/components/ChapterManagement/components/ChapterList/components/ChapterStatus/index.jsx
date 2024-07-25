import { memo } from "react";
import { CREATED, DELETED} from "../../constants";

function ChapterStatus({
    status
}) {

    let backgroundColor = 'gray'

    switch (status) {
        case CREATED:
            backgroundColor = 'green'
            break

        case DELETED:
            backgroundColor = 'red'
            break
    }

    return (
        <span 
            className="px-4 py-2 rounded-[12px] text-white text-[0.8rem] font-[600]"
            style={{
                backgroundColor
            }}
        >
            {status === CREATED && 'CREATED'}
            {status === DELETED && 'DELETED'}
        </span>
    )
}

export default memo(ChapterStatus)