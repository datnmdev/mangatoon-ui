import { Skeleton } from '@mui/material'

function SkeletonProfile() {
    return (
        <Skeleton
            variant="circular" 
            animation='wave'
            width={48} 
            height={48} 
        />
    )
}

export default SkeletonProfile