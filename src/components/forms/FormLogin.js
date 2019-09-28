import React, { useEffect, useState } from 'react'
import { Power3 } from 'gsap'
import TweenLite from 'gsap/umd/TweenLite'

import IconAccountCircle from '@material-ui/icons/AccountCircle'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'

import Button from '../material/Button'
import InputField from '../material/InputField'

import { appName } from '../../config/settings.json'
import Logo from '../../assets/images/logo.png'

function FormLogin (props) {
  let formElement = null
  const [state, setState] = useState({
    username: '',
    password: ''
  })

  useEffect(() => {
    TweenLite.fromTo(formElement, 0.5, { x: -40, opacity: 0 }, { x: 0, opacity: 1, ease: Power3.ease })
  }, [formElement])

  const _changeForm = (name) => {
    if (props.changeForm) {
      TweenLite.to(formElement, 1, { x: -100, opacity: 0, ease: Power3.ease })
      setTimeout(() => props.changeForm(name), 500)
    }
  }

  const handleChange = (field, value) => {
    setState({ ...state, [field]: value })
  }

  return (
    <div ref={div => (formElement = div)}>
      <div className='box'>
        <div className='header'>
          <img src={Logo} alt={appName} className='logo' />
          <div>{appName}</div>
        </div>
        <form>
          <InputField
            full
            borderBottomColor='white'
            icon={IconAccountCircle}
            id='username'
            label='Username'
            value={state.username}
            handleChange={val => handleChange('username', val)}
          />

          <InputField
            full
            borderBottomColor='white'
            id='password'
            isSecure
            label='Password'
            value={state.password}
            handleChange={val => handleChange('password', val)}
            visibilityIcons={[VisibilityOff, Visibility]}
          />

          <div className='button'>
            <Button full label='Sign In' />
          </div>

          <div className='separator'>or</div>

          <div className='button'>
            <Button
              full
              label='Sign Up'
              buttonClass='link'
              onClick={() => _changeForm('signup')}
            />
          </div>
        </form>
      </div>
    </div>
  )
}

export default FormLogin