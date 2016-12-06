import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import session from './session'

const oaaChat = combineReducers({ session, formReducer })

export default oaaChat