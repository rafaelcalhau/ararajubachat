import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSnackbar } from 'notistack'
import { Power3 } from 'gsap'
import TweenLite from 'gsap/umd/TweenLite'

import IconAccountCircle from '@material-ui/icons/AccountCircle'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'

import Button from '../material/Button'
import InputField from '../material/InputField'

import { appName, regexList } from '../../config/settings.json'
import Logo from '../../assets/images/logo.png'

import actions from '../../store/user/actions'
import validator from '../../modules/validators/signup'

function FormSignup (props) {
  let formElement = null
  const [state, setState] = useState({
    buttonIsDisabled: true,
    errors: {},
    usernameBlurInvoked: false
  })

  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')

  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()
  const {
    isRegisteringUser,
    isUsernameAvailable,
    isVerifyingUsername,
    registrationError
  } = useSelector(state => state.user)

  useEffect(() => {
    TweenLite.fromTo(formElement, 0.5, { x: 40, opacity: 0 }, { x: 0, opacity: 1, ease: Power3.ease })
  }, [formElement])

  const createAccount = () => {
    const validation = validator({ firstname, lastname, username, password, passwordConfirm })

    if (!validation.success) {
      setState({
        ...state,
        errors: {
          ...state.errors,
          ...validation.errors
        }
      })
    } else {
      dispatch(actions.registerUser({ firstname, lastname, username, password }))
    }
  }

  const _changeForm = (name) => {
    if (props.changeForm) {
      TweenLite.to(formElement, 1, { x: 100, opacity: 0, ease: Power3.ease })
      setTimeout(() => props.changeForm(name), 500)
    }
  }

  const handleBlur = (val) => {
    if (val.length >= 3) {
      dispatch(actions.verifyUsername(val))
    }

    setState({ ...state, usernameBlurInvoked: true })
  }

  const handleChange = (field, value) => {
    const newState = { ...state, [field]: value }

    switch (field) {
      case 'firstname':
        setFirstname(value)
        break
      case 'lastname':
        setLastname(value)
        break
      case 'username':
        if (value.length > 0) {
          if (!new RegExp(regexList.username).test(value)) {
            newState.errors.username = 'Your username must start with a letter and use only lowercase characters.'
          } else {
            newState.errors.username = undefined
          }
        }
        setUsername(value)
        break
      case 'password':
        setPassword(value)
        break
      case 'passwordConfirm':
        setPasswordConfirm(value)
        break
      default:
        return null
    }

    newState.usernameBlurInvoked = false
    setState(newState)
  }

  const handleCreateButton = () => {
    if (isRegisteringUser) {
      return true
    } else if (registrationError) {
      return false
    }

    return !(
      firstname !== '' && lastname !== '' &&
      username !== '' && password !== '' &&
      passwordConfirm !== ''
    )
  }

  const handleFormErrors = (field) => {
    switch (field) {
      case 'username':
        if (state.errors[field]) {
          return state.errors[field]
        } else if (username.length >= 3 && isUsernameAvailable === false && !isVerifyingUsername) {
          return 'This username is unavailable.'
        }
        break
      default:
        if (state.errors[field] !== undefined) {
          return state.errors[field]
        }

        return false
    }
  }

  const handleUsernameInputColor = () => {
    const { errors, usernameBlurInvoked } = state

    if (usernameBlurInvoked && !isVerifyingUsername) {
      if (errors.username) {
        return 'red'
      } else if (username.length >= 3) {
        if (isUsernameAvailable === false) {
          return 'red'
        } else {
          return 'green'
        }
      }
    }

    return null
  }

  useEffect(() => {
    if (registrationError) {
      enqueueSnackbar('Uhoh! Was not possible to create your account :(', {
        variant: 'error',
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'center'
        }
      })
    }
  }, [enqueueSnackbar, registrationError])

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
            error={handleFormErrors('firstname')}
            id='firstname'
            label='Firstname'
            handleChange={val => handleChange('firstname', val)}
            value={firstname}
          />

          <InputField
            full
            borderBottomColor='white'
            error={handleFormErrors('lastname')}
            id='lastname'
            label='Lastname'
            handleChange={val => handleChange('lastname', val)}
            value={lastname}
          />

          <InputField
            disabled={props.isVerifyingUsername}
            error={handleFormErrors('username')}
            full
            borderBottomColor='white'
            icon={IconAccountCircle}
            iconColor={handleUsernameInputColor()}
            id='username'
            label='Username'
            handleBlur={val => handleBlur(val)}
            handleChange={val => handleChange('username', val)}
            value={username}
          />

          <InputField
            full
            borderBottomColor='white'
            error={handleFormErrors('password')}
            id='password'
            isSecure
            label='Password'
            handleChange={val => handleChange('password', val)}
            value={password}
            visibilityIcons={[VisibilityOff, Visibility]}
          />

          <InputField
            full
            borderBottomColor='white'
            error={handleFormErrors('passwordConfirm')}
            id='passwordConfirm'
            isSecure
            label='Confirm Password'
            handleChange={val => handleChange('passwordConfirm', val)}
            value={passwordConfirm}
            visibilityIcons={[VisibilityOff, Visibility]}
          />

          <div className='button'>
            <Button
              disabled={handleCreateButton()}
              full
              label='Create'
              onClick={() => createAccount()}
            />
          </div>

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
