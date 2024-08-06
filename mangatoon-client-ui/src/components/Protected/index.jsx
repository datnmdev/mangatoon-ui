import { useSelector } from "react-redux"
import { userSelectors } from "../../features/user.feature"
import { memo, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import location from "../../routers/location"

function Protected({ 
    children,
    enable = true
}) {
    const navigate = useNavigate()
    const tokens = useSelector(userSelectors.selectTokens)

    useEffect(() => {
        if (enable && !localStorage.getItem('tokens') && !tokens) {
            navigate(location.signInPage())
        }
    }, [tokens, enable])

    return children
}

export default memo(Protected)