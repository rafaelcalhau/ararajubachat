import React from 'react'

import Logo from '../assets/images/logo.png'
import { appName } from '../config/settings.json'

function Main () {
  return (
    <header>
      <img src={Logo} alt={appName} className='logo' />
    </header>
  )
}

export default Main
