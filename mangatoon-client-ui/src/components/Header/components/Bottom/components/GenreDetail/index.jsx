import { memo } from "react"
import { Link, useNavigate } from "react-router-dom"

function GenreDetail({
    data = [],
    sx = {}
}) {
    const navigate = useNavigate()

    return (
        <div
            className='sm:relative sm:animate-dropdown md:absolute md:left-0 md:w-[100vw] text-black bg-white'
            style={sx}
        >
            <div className='container mx-auto md:my-[22px] xl:my-[22px]'>
                <ul className='flex flex-wrap items-center sm:p-4'>
                    {data.map((item, index) => {
                        return (
                            <li
                                className="grow-0"
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