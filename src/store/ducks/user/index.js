import types from './types'

const INITIAL_STATE = {
  data: null,
  authError: null,
  isRegisteringUser: false,
  isVerifyingUsername: false,
  isUsernameAvailable: null,
  registrationError: null
}

const reducer = (state = INITIAL_STATE, action) => {
  const { type } = action

  switch (type) {
    case types.AUTH_TOKEN_FAILURE:
      return {
        ...state,
        authError: action.data
      }
    case types.AUTH_TOKEN_SUCCESS:
      return {
        ...state,
        data: action.data
      }
    case types.REGISTER_USER_FAILURE:
      return {
        ...state,
        isRegisteringUser: false,
        registrationError: action.data
      }
    case types.REGISTER_USER_REQUEST:
      return {
        ...state,
        isRegisteringUser: true,
        registrationError: null
      }
    case types.REGISTER_USER_SUCCESS:
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
    case types.VERIFY_USERNAME_FAILURE:
      return {
        ...state,
        isVerifyingUsername: false,
        isUsernameAvailable: false
      }
    case types.VERIFY_USERNAME_REQUEST:
      return {
        ...state,
        isVerifyingUsername: true
      }
    case types.VERIFY_USERNAME_SUCCESS:
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
