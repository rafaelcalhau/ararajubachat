import React, { PureComponent } from 'react'

import FormLogin from '../components/forms/FormLogin'
import FormSignup from '../components/forms/FormSignup'
import '../assets/styles/login.css'

class Login extends PureComponent {
  constructor (props) {
    super(props)

    this.state = {
      formName: 'login'
    }
  }

  changeForm = formName => this.setState({ formName })

  render () {
    return (
      <div id='login'>
        {
          this.state.formName === 'login'
            ? <FormLogin changeForm={formName => this.changeForm(formName)} />
            : <FormSignup changeForm={formName => this.changeForm(formName)} />
        }

      </div>
    )
  }
}

export default Login
