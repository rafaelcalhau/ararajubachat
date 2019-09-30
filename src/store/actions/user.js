import apiClient from '../../modules/apiclient'

export const verifyUsername = (apiClient, username) => (dispatch) => {
  dispatch(verifyUsernameRequest())

  apiClient
    .get(`/users/username/${username}`)
    .then(({ data }) => dispatch(verifyUsernameSuccess(data)))
    .catch(err => dispatch(verifyUsernameFailure(err)))
}

export const verifyUsernameFailure = (err) => ({ type: 'VERIFY_USERNAME_FAILURE', data: err })

export const verifyUsernameRequest = () => ({ type: 'VERIFY_USERNAME_REQUEST' })

export const verifyUsernameSuccess = (data) => ({ type: 'VERIFY_USERNAME_SUCCESS', data })

export default {
  verifyUsername: verifyUsername.bind(null, apiClient)
}
