const INITIAL_STATE = {
  data: null,
  isVerifyingUsername: false,
  isUsernameAvailable: false
}

const reducer = (state = INITIAL_STATE, action) => {
  const { type } = action

  switch (type) {
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
