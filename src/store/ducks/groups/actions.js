import types from './types'
import apiClient from '../../../modules/apiclient'

export const loadGroups = (apiClient, token) => (dispatch) => {
  try {
    dispatch(listRequest())

    apiClient
      .get('/groups', {
        headers: {
          authorization: `Bearer ${token}`
        }
      })
      .then(({ data }) => dispatch(listSuccess(data)))
      .catch(err => dispatch(listFailure(err)))
  } catch (e) {
    console.log(e)
    dispatch(listFailure(e))
  }
}

export const loadUserGroups = (apiClient, userId, token) => (dispatch) => {
  try {
    dispatch(listPrivatesRequest())

    apiClient
      .get(`/users/${userId}/groups`, {
        headers: {
          authorization: `Bearer ${token}`
        }
      })
      .then(({ data }) => dispatch(listPrivatesSuccess(data)))
      .catch(err => dispatch(listPrivatesFailure(err)))
  } catch (e) {
    console.log(e)
    dispatch(listPrivatesFailure(e))
  }
}

// Non exported functions

const listFailure = (err) => ({ type: types.LIST_FAILURE, data: err })

const listRequest = () => ({ type: types.LIST_REQUEST })

const listSuccess = (data) => ({ type: types.LIST_SUCCESS, data })

const listPrivatesFailure = (err) => ({ type: types.LIST_PRIVATES_FAILURE, data: err })

const listPrivatesRequest = () => ({ type: types.LIST_PRIVATES_REQUEST })

const listPrivatesSuccess = (data) => ({ type: types.LIST_PRIVATES_SUCCESS, data })

export default {
  loadGroups: loadGroups.bind(null, apiClient),
  loadUserGroups: loadUserGroups.bind(null, apiClient)
}
