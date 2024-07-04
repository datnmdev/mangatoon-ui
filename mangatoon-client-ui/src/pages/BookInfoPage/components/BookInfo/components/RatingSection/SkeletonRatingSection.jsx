import { Rating, Skeleton } from "@mui/material"

function SkeletonRatingSection() {
    return (
        <Skeleton 
            variant="rounded"
            animation="wave"
        >
            <div className='flex items-center space-x-2'>
                <Rating size="large"/>
                <span className="w-[220px]"> </span>
            </div>
        </Skeleton>
    )
}

export default SkeletonRatingSection