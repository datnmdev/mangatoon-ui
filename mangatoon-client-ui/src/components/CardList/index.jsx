import { memo } from 'react'
import Card from '../Card'
import Pagination from '@mui/material/Pagination'

function CardList({
    data = [],
    totalPage = 10,
    page = 1,
    onChange = (e, value) => { }
}) {
    return (
        <div>
            <ul className='grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 sm:gap-2 md:gap-4'>
                {data.map((item) => {
                    return (
                        <Card
                            key={item.id}
                            data={item}
                        />
                    )
                })}
            </ul>

            <div className='flex justify-center mt-8'>
                {totalPage > 0
                    ? (
                        <Pagination
                            count={totalPage}
                            size='large'
                            page={page}
                            onChange={onChange}
                        />
                    )
                    : null}
            </div>
        </div>
    )
}

export default memo(CardList)