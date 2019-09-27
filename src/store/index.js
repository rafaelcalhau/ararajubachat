const INITIAL_STATE = {
  user: null
}

const reducer = (state = INITIAL_STATE, action) => {
  const { type, value } = action

  switch (type) {
    case 'LOGIN':
      return {
        ...state,
        user: {
          id: value.id,
          name: value.name,
          token: value.token
        }
      }
    default:
      return state
  }
}

export default reducer
