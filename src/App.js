import React from 'react'
import { useSelector } from 'react-redux'

import Login from './views/Login'
import Main from './views/Main'

import './assets/styles/app.css'

function App () {
  const user = useSelector(state => state.user.data)

  return (
    <div className='App'>
      {
        !user
          ? <Login />
          : <Main />
      }
    </div>
  )
}

export default App
