import apiClient from '../../modules/apiclient'

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

export const recoverStoredUser = () => ({ type: 'RECOVER_STORED_USER' })

const registerUserFailure = (err) => ({ type: 'REGISTER_USER_FAILURE', data: err })

const registerUserRequest = () => ({ type: 'REGISTER_USER_REQUEST' })

const registerUserSuccess = (data) => ({ type: 'REGISTER_USER_SUCCESS', data })

const verifyUsernameFailure = (err) => ({ type: 'VERIFY_USERNAME_FAILURE', data: err })

const verifyUsernameRequest = () => ({ type: 'VERIFY_USERNAME_REQUEST' })

const verifyUsernameSuccess = (data) => ({ type: 'VERIFY_USERNAME_SUCCESS', data })

export default {
  registerUser: registerUser.bind(null, apiClient),
  verifyUsername: verifyUsername.bind(null, apiClient)
}
