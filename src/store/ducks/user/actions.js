import types from './types'
import apiClient from '../../../modules/apiclient'

export const authenticate = (apiClient, username, password) => (dispatch) => {
  try {
    dispatch(authenticateRequest())

    apiClient
      .post('/authenticate', { username, password })
      .then(({ data }) => dispatch(authenticateSuccess({ ...data, username })))
      .catch(err => dispatch(authenticateFailure(err)))
  } catch (e) {
    console.log(e)
    dispatch(authenticateFailure(e))
  }
}

export const authenticateWithToken = (apiClient, localStorage) => (dispatch) => {
  const storedData = localStorage.getItem('ararajubachat')

  if (storedData) {
    try {
      const user = JSON.parse(storedData)
      dispatch(authenticateWithTokenRequest())

      setTimeout(() => {
        apiClient
          .post('/authenticate-token', {
            username: user.username,
            token: user.token
          })
          .then(() => dispatch(authenticateWithTokenSuccess(user)))
          .catch(err => dispatch(authenticateWithTokenFailure(err)))
      }, 2000)
    } catch (e) {
      console.log(e)
      dispatch(authenticateWithTokenFailure(e))
    }
  }
}

export const logout = () => ({ type: types.LOGOUT })

export const registerUser = (apiClient, userData) => (dispatch) => {
  dispatch(registerUserRequest())

  apiClient
    .post('/users', userData)
    .then(({ data }) => dispatch(registerUserSuccess(data)))
    .catch(err => dispatch(registerUserFailure(err)))
}

export const verifyUsername = (apiClient, username) => (dispatch) => {
  dispatch(verifyUsernameRequest())

  apiClient
    .get(`/users/username/${username}`)
    .then(({ data }) => dispatch(verifyUsernameSuccess(data)))
    .catch(err => dispatch(verifyUsernameFailure(err)))
}

// Non exported functions

const authenticateFailure = (err) => ({ type: types.AUTH_FAILURE, data: err })

const authenticateRequest = () => ({ type: types.AUTH_REQUEST })

const authenticateSuccess = (data) => ({ type: types.AUTH_SUCCESS, data })

const authenticateWithTokenFailure = (err) => ({ type: types.AUTH_TOKEN_FAILURE, data: err })

const authenticateWithTokenRequest = () => ({ type: types.AUTH_TOKEN_REQUEST })

const authenticateWithTokenSuccess = (data) => ({ type: types.AUTH_TOKEN_SUCCESS, data })

const registerUserFailure = (err) => ({ type: types.REGISTER_USER_FAILURE, data: err })

const registerUserRequest = () => ({ type: types.REGISTER_USER_REQUEST })

const registerUserSuccess = (data) => ({ type: types.REGISTER_USER_SUCCESS, data })

const verifyUsernameFailure = (err) => ({ type: types.VERIFY_USERNAME_FAILURE, data: err })

const verifyUsernameRequest = () => ({ type: types.VERIFY_USERNAME_REQUEST })

const verifyUsernameSuccess = (data) => ({ type: types.VERIFY_USERNAME_SUCCESS, data })

export default {
  authenticate: authenticate.bind(null, apiClient),
  authenticateWithToken: authenticateWithToken.bind(null, apiClient, window.localStorage),
  registerUser: registerUser.bind(null, apiClient),
  verifyUsername: verifyUsername.bind(null, apiClient)
}
