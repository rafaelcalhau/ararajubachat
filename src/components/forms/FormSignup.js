import React, { useEffect } from 'react'
import { TweenLite, Power3 } from 'gsap/all'

import IconAccountCircle from '@material-ui/icons/AccountCircle'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'

import Button from '../material/Button'
import InputField from '../material/InputField'

import { appName } from '../../config/settings.json'
import Logo from '../../assets/images/logo.png'

function FormSignup (props) {
  let formElement = null

  useEffect(() => {
    TweenLite.fromTo(formElement, 0.5, { x: 40, opacity: 0 }, { x: 0, opacity: 1, ease: Power3.ease })
  }, [formElement])

  const _changeForm = (name) => {
    if (props.changeForm) {
      TweenLite.to(formElement, 1, { x: 100, opacity: 0, ease: Power3.ease })
      setTimeout(() => props.changeForm(name), 500)
    }
  }

  const handleChange = (field, value) => {
    console.log(field, value)
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
            id='firstname'
            label='Firstname'
            handleChange={val => handleChange('firstname', val)}
          />

          <InputField
            full
            borderBottomColor='white'
            id='lastname'
            label='Lastname'
            handleChange={val => handleChange('lastname', val)}
          />

          <InputField
            full
            borderBottomColor='white'
            icon={IconAccountCircle}
            id='username'
            label='Username'
            handleChange={val => handleChange('username', val)}
          />

          <InputField
            full
            borderBottomColor='white'
            id='password'
            isSecure
            label='Password'
            visibilityIcons={[VisibilityOff, Visibility]}
          />

          <InputField
            full
            borderBottomColor='white'
            id='passwordConfirm'
            isSecure
            label='Confirm Password'
            visibilityIcons={[VisibilityOff, Visibility]}
          />

          <div className='button'>
            <Button full label='Create' />
          </div>

          <div className='separator'>or</div>

          <div className='button'>
            <Button
              full
              label='Back'
              buttonClass='link'
              onClick={() => _changeForm('login')}
              style={{ width: '100%' }}
            />
          </div>
        </form>
      </div>
    </div>
  )
}

export default FormSignup
