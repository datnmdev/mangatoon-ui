import { Skeleton } from "@mui/material"
import IconButton from "../../../../../../components/IconButton"

function SkeletonFollowButton() {
    return (
        <Skeleton variant="rounded" animation="wave">
            <IconButton
                backgroundColor='#ff3860'
            >
                Theo Dõi
            </IconButton>
        </Skeleton>
    )
}

export default SkeletonFollowButton