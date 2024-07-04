import { useDispatch } from 'react-redux'
import './App.css'
import AppRouter from './routers'
import { useEffect } from 'react'
import { userActions } from './features/user.feature'
import ToastContainer from './components/ToastContainer'
import { getVisitorId } from './helpers/fingerprints'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    const tokens = localStorage.getItem('tokens')
    if (tokens) {
      dispatch(userActions.addTokens(JSON.parse(tokens)))
    }

    async function createVisitorId() {
      localStorage.setItem('visitorId', await getVisitorId())
    }
    
    createVisitorId()
  }, [])

  return (
    <div>
      <AppRouter />
      <ToastContainer />
    </div>
  )
}

export default App
