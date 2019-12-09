import { combineReducers } from 'redux'

import groups from './ducks/groups'
import user from './ducks/user'

export default combineReducers({ groups, user })
