import { useSelector } from "react-redux"
import { userSelectors } from "../../features/user.feature"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import path from "../../routers/path"

function Protected({ 
    children,
    enable = true
}) {
    const navigate = useNavigate()
    const tokens = useSelector(userSelectors.selectTokens)

    useEffect(() => {
        if (enable && !localStorage.getItem('tokens') && !tokens) {
            navigate(path.signInPage())
        }
    }, [tokens, enable])

    return children
}

export default Protected