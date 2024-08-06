import { memo } from 'react'
import CardList from '../CardList'

function Topic({
    name,
    children
}) {
    return (
        <div>
            <div>
                <div className='text-[1.4rem] text-[#56CBF2]'>{name}</div>
            </div>

            <div className='mt-4'>
                {children}
            </div>
        </div>
    )
}

export default memo(Topic)