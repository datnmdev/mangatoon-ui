import { memo } from "react"
import { Link, useNavigate } from "react-router-dom"

function GenreDetail({
    data = [],
    sx = {}
}) {
    const navigate = useNavigate()

    return (
        <div
            className='absolute left-0 w-[100vw] text-black z-10 bg-white'
            style={sx}
        >
            <div className='container mx-auto my-[22px]'>
                <ul className='flex flex-wrap items-center'>
                    {data.map((item, index) => {
                        return (
                            <li
                                key={index}
                            >
                                <Link
                                    className='block min-w-[140px] min-h-[40px] hover:text-[#F08121]'
                                    onClick={e => {
                                        e.preventDefault()
                                        navigate(item.link)
                                        window.location.reload()
                                    }}
                                >
                                    {item.name}
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}

export default memo(GenreDetail)