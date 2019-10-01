import React, { useState } from 'react'

import FormLogin from '../components/forms/FormLogin'
import FormSignup from '../components/forms/FormSignup'
import '../assets/styles/login.css'

export default function Login () {
  const [formName, setFormName] = useState('login')

  return (
    <div id='login'>
      {
        formName === 'login'
          ? <FormLogin changeForm={formName => setFormName(formName)} />
          : <FormSignup changeForm={formName => setFormName(formName)} />
      }
    </div>
  )
}
