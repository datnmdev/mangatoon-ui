import { useDispatch } from 'react-redux'
import './App.css'
import AppRouter from './routers'
import { useEffect } from 'react'
import { userActions } from './features/user.feature'
import ToastContainer from './components/ToastContainer'

function App() {
  const dispatch = useDispatch()


  useEffect(() => {
    const tokens = localStorage.getItem('tokens')
    if (tokens) {
      dispatch(userActions.addTokens(JSON.parse(tokens)))
    }
  }, [])

  return (
    <div>
      <AppRouter />
      <ToastContainer />
    </div>
  )
}

export default App
