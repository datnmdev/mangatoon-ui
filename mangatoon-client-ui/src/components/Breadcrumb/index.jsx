import { memo } from 'react'
import { Link } from 'react-router-dom'

function Breadcrumb({ data = [] }) {
    return (
        <div className='space-x-3'>
            {data.map((item, index) => {
                return (
                    <span 
                        key={index}
                        className='space-x-3'
                    >
                        <Link
                            className='hover:underline hover:text-[#F08121]'
                            to={item.link}
                        >
                            {item.title}
                        </Link>

                        {index < data.length - 1
                            && (
                                <span>/</span>
                            )}
                    </span>
                )
            })}
        </div>
    )
}

export default memo(Breadcrumb)