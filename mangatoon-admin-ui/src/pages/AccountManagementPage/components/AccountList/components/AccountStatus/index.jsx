import { ACTIVATED, DELETED, LOCKED, UNACTIVATED } from "../../../../constants"

function AccountStatus({
    status
}) {

    let backgroundColor = 'gray'

    switch (status) {
        case UNACTIVATED:
            backgroundColor = 'gray'
            break

        case ACTIVATED:
            backgroundColor = 'green'
            break

        case LOCKED:
            backgroundColor = '#b7b707'
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
            {status === UNACTIVATED && 'UNACTIVATED'}
            {status === ACTIVATED && 'ACTIVATED'}
            {status === LOCKED && 'LOCKED'}
            {status === DELETED && 'DELETED'}
        </span>
    )
}

export default AccountStatus