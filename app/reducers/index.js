import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import session from './session'

const oaaChat = combineReducers({ session, form })

export default oaaChat