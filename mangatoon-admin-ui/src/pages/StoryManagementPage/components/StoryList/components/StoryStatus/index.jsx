import { DELETED, FINISHED, IN_PROGRESS, SUSPENDED, UNPUBLISHED } from "../../constants";

function StoryStatus({
    status
}) {

    let backgroundColor = 'gray'

    switch (status) {
        case UNPUBLISHED:
            backgroundColor = 'gray'
            break

        case IN_PROGRESS:
            backgroundColor = 'green'
            break

        case SUSPENDED:
            backgroundColor = '#b7b707'
            break

        case FINISHED:
            backgroundColor = 'blue'
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
            {status === UNPUBLISHED && 'UNPUBLISHED'}
            {status === IN_PROGRESS && 'IN_PROGRESS'}
            {status === SUSPENDED && 'SUSPENDED'}
            {status === FINISHED && 'FINISHED'}
            {status === DELETED && 'DELETED'}
        </span>
    )
}

export default StoryStatus