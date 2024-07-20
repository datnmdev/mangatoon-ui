import { Skeleton } from '@mui/material'
import { memo } from 'react'

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

export default memo(SkeletonProfile)