import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SnackbarProvider } from 'notistack'

import userActions from './store/ducks/user/actions'

import Login from './views/Login'
import Main from './views/Main'

import './assets/styles/app.css'

function App () {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user.data)

  if (!user) {
    dispatch(userActions.authenticateWithToken())
  }

  return (
    <SnackbarProvider
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center'
      }}
      className='App'
      maxSnack={3}
    >
      {
        !user ? <Login /> : <Main />
      }
    </SnackbarProvider>
  )
}

export default App
