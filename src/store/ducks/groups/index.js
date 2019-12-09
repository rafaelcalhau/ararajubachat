import types from './types'

const INITIAL_STATE = {
  public: {
    data: [],
    error: '',
    isLoaded: false,
    isLoading: false
  },
  private: {
    data: [],
    error: '',
    isLoaded: false,
    isLoading: false
  }
}

const reducer = (state = INITIAL_STATE, action) => {
  const { type } = action

  switch (type) {
    case types.LIST_FAILURE:
      return {
        ...state,
        public: {
          ...state.public,
          error: action.data,
          isLoaded: true,
          isLoading: false
        }
      }
    case types.LIST_REQUEST:
      return {
        ...state,
        public: {
          ...state.public,
          isLoaded: false,
          isLoading: true
        }
      }
    case types.LIST_SUCCESS:
      return {
        ...state,
        public: {
          ...state.public,
          data: action.data,
          error: '',
          isLoaded: true,
          isLoading: false
        }
      }
    case types.LIST_PRIVATES_FAILURE:
      return {
        ...state,
        private: {
          ...state.private,
          error: action.data,
          isLoaded: true,
          isLoading: false
        }
      }
    case types.LIST_PRIVATES_REQUEST:
      return {
        ...state,
        private: {
          ...state.private,
          isLoaded: false,
          isLoading: true
        }
      }
    case types.LIST_PRIVATES_SUCCESS:
      return {
        ...state,
        private: {
          ...state.private,
          data: action.data,
          error: '',
          isLoaded: true,
          isLoading: false
        }
      }
    default:
      return state
  }
}

export default reducer
