import apiClient from '../../modules/apiclient'

export const authenticateWithToken = (apiClient, localStorage) => (dispatch) => {
  const storedData = localStorage.getItem('ararajubachat')

  if (storedData) {
    try {
      const user = JSON.parse(storedData)
      dispatch(authenticateWithTokenRequest({ isAuthenticating: true }))

      apiClient
        .post('/authenticate-token', {
          username: user.username,
          token: user.token
        })
        .then(({ data }) => dispatch(authenticateWithTokenSuccess(data)))
        .catch(err => dispatch(authenticateWithTokenFailure(err)))
    } catch (e) {
      console.log(e)
      dispatch(authenticateWithTokenFailure(e))
    }
  }
}

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

const authenticateWithTokenFailure = (err) => ({ type: 'AUTH_TOKEN_FAILURE', data: err })

const authenticateWithTokenRequest = (data) => ({ type: 'AUTH_TOKEN_REQUEST', data })

const authenticateWithTokenSuccess = (data) => ({ type: 'AUTH_TOKEN_SUCCESS', data })

const registerUserFailure = (err) => ({ type: 'REGISTER_USER_FAILURE', data: err })

const registerUserRequest = () => ({ type: 'REGISTER_USER_REQUEST' })

const registerUserSuccess = (data) => ({ type: 'REGISTER_USER_SUCCESS', data })

const verifyUsernameFailure = (err) => ({ type: 'VERIFY_USERNAME_FAILURE', data: err })

const verifyUsernameRequest = () => ({ type: 'VERIFY_USERNAME_REQUEST' })

const verifyUsernameSuccess = (data) => ({ type: 'VERIFY_USERNAME_SUCCESS', data })

export default {
  authenticateWithToken: authenticateWithToken.bind(null, apiClient, window.localStorage),
  registerUser: registerUser.bind(null, apiClient),
  verifyUsername: verifyUsername.bind(null, apiClient)
}
