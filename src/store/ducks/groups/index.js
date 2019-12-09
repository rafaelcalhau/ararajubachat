import types from './types'

const INITIAL_STATE = {
  data: [],
  error: '',
  isLoaded: false,
  isLoading: false
}

const reducer = (state = INITIAL_STATE, action) => {
  const { type } = action

  switch (type) {
    case types.LIST_FAILURE:
      return {
        ...state,
        error: action.data,
        isLoaded: true,
        isLoading: false
      }
    case types.LIST_REQUEST:
      return {
        ...state,
        isLoaded: false,
        isLoading: true
      }
    case types.LIST_SUCCESS:
      return {
        ...state,
        data: action.data,
        error: '',
        isLoaded: true,
        isLoading: false
      }
    default:
      return state
  }
}

export default reducer
