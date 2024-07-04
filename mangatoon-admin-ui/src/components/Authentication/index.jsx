import { useDispatch, useSelector } from "react-redux"
import { refreshAsyncThunks, refreshTokenActions, refreshTokenSelectors } from "../../features/refreshToken/refreshTokenSlice"
import { useEffect, useState } from "react"
import { FAILED, IDLE, PENDING, SUCCEEDED } from "../../constants/fetchStatus"
import { loaderActions } from "../../features/loader/loaderSlice"
import { useLocation, useNavigate } from "react-router-dom"
import { jwtDecode } from 'jwt-decode'

function Authentication({ children }) {
    const refreshTokenState = useSelector(refreshTokenSelectors.selectAll)
    const dispatch = useDispatch()
    const [status, setStatus] = useState(IDLE)
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        async function submit() {
            try {
                setStatus(PENDING)
                await dispatch(refreshAsyncThunks.submit()).unwrap()
                setStatus(SUCCEEDED)
            } catch (error) {
                setStatus(FAILED)
            }
        }

        submit()
    }, [dispatch, refreshTokenState.refetch])

    useEffect(() => {
        switch (status) {
            case IDLE:
            case PENDING:
                if (refreshTokenState.refetch.value === 0) {
                    dispatch(loaderActions.pageLoaderVisible(true))
                }
                break

            case SUCCEEDED:
                dispatch(loaderActions.pageLoaderVisible(false))
                if (refreshTokenState.data.data?.token.accessToken) {
                    localStorage.setItem('accessToken', refreshTokenState.data.data.accessToken)
                    localStorage.setItem('refreshToken', refreshTokenState.data.data.refreshToken)
                }
                const accessToken = localStorage.getItem('accessToken')
                if (accessToken) {
                    const payload = jwtDecode(accessToken)
                    if (Date.now() < payload.iat + 2 * 60 * 60 * 1000) {
                        if (refreshTokenState.refetch.value === 0) {
                            if (location.pathname == '/') {
                                navigate('/manage')
                            } else {
                                navigate(location.pathname)
                            }
                        }
                    } else {
                        navigate('/')
                    }
                } else {
                    navigate('/')
                }
                break

            default:
                if (refreshTokenState.refetch.value === 0) {
                    dispatch(loaderActions.pageLoaderVisible(false))
                }
                break
        }
    }, [status])

    return (
        <>
            {children}
        </>
    )
}

export default Authentication