import types from './types'

const INITIAL_STATE = {
  data: [],
  error: '',
  isLoading: false
}

const reducer = (state = INITIAL_STATE, action) => {
  const { type } = action

  switch (type) {
    case types.LIST_FAILURE:
      return {
        ...state,
        error: action.data,
        isLoading: false
      }
    case types.LIST_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case types.LIST_SUCCESS:
      return {
        ...state,
        data: action.data,
        error: '',
        isLoading: false
      }
    default:
      return state
  }
}

export default reducer
