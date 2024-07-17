import axios from 'axios'
import api from '../../api'
import store from '../../store'
import { userActions } from '../../features/user.feature'

export default function axiosInstance() {
  const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_GATEWAY_URL,
    headers: {
      Authorization: `Bearer ${store.getState().user.tokens?.accessToken || import.meta.env.VITE_GUEST_ACCESS_TOKEN}`
    }
  })
  
  const refreshSubscribersQueue = []
  
  axiosInstance.interceptors.response.use(
    async (response) => {
      if (response.data.error && response.data.error.status === 401) {
        const refreshSubscriber = {}
        refreshSubscribersQueue.push(refreshSubscriber)
  
        await new Promise((resolve) => {
          const checkInterval = setInterval(() => {
            if (refreshSubscribersQueue[0] === refreshSubscriber) {
              clearInterval(checkInterval)
              resolve()
            }
          }, 100)
        })
  
        const refreshToken = await (await api.user.refreshToken(JSON.parse(localStorage.getItem('tokens')))).data.data
        if (refreshToken) {
          store.dispatch(userActions.addTokens(refreshToken))
          response.config.headers.Authorization = `Bearer ${refreshToken.accessToken}`
          const newResponse = await axios(response.config)
          return newResponse
        } else {
          store.dispatch(userActions.removeTokens())
          store.dispatch(userActions.removeProfile())
          store.dispatch(userActions.removeAccountInfo())
        }
  
        refreshSubscribersQueue.splice(0, 1)
      }
  
      return response
    }
  )

  return axiosInstance
}