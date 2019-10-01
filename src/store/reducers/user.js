const INITIAL_STATE = {
  data: null,
  isRegisteringUser: false,
  isVerifyingUsername: false,
  isUsernameAvailable: null,
  registrationError: null
}

const reducer = (state = INITIAL_STATE, action) => {
  const { type } = action

  switch (type) {
    case 'RECOVER_STORED_USER':
      return (function () {
        let user

        try {
          const data = window.localStorage.getItem('ararajubachat')
          user = JSON.parse(data)
        } catch (e) {
          user = null
          console.log(e)
        }

        return {
          ...state,
          data: user
        }
      }())
    case 'REGISTER_USER_FAILURE':
      return {
        ...state,
        isRegisteringUser: false,
        registrationError: action.data
      }
    case 'REGISTER_USER_REQUEST':
      return {
        ...state,
        isRegisteringUser: true,
        registrationError: null
      }
    case 'REGISTER_USER_SUCCESS':
      return (function () {
        const user = {
          name: action.data.firstname,
          username: action.data.username,
          token: action.data.token
        }

        window.localStorage.setItem('ararajubachat', JSON.stringify(user))

        return {
          ...state,
          data: user,
          isRegisteringUser: false,
          registrationError: null
        }
      }())
    case 'VERIFY_USERNAME_FAILURE':
      return {
        ...state,
        isVerifyingUsername: false,
        isUsernameAvailable: false
      }
    case 'VERIFY_USERNAME_REQUEST':
      return {
        ...state,
        isVerifyingUsername: true
      }
    case 'VERIFY_USERNAME_SUCCESS':
      return {
        ...state,
        isVerifyingUsername: false,
        isUsernameAvailable: action.data.valid
      }
    default:
      return state
  }
}

export default reducer
