import React from 'react'
import IconAccountCircle from '@material-ui/icons/AccountCircle'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'

import Button from '../components/material/Button'
import InputField from '../components/material/InputField'

import { appName } from '../config/settings.json'
import Logo from '../assets/images/logo.png'

import '../assets/styles/login.css'

function Login () {
  const handleChange = (field, value) => {
    console.log(field, value)
  }

  return (
    <div id='login'>
      <div className='box'>
        <div className='header'>
          <img src={Logo} alt={appName} className='logo' />
          <div>{appName}</div>
        </div>
        <form>
          <InputField
            borderBottomColor='white'
            icon={IconAccountCircle}
            id='username'
            label='Username'
            handleChange={val => handleChange('username', val)}
          />

          <InputField
            borderBottomColor='white'
            id='password'
            isSecure
            label='Password'
            visibilityIcons={[VisibilityOff, Visibility]}
          />

          <div style={{ margin: 10 }}>
            <Button full label='Sign In' />
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
