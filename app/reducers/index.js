import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import session from './session'
import accountActivate from './accountActivate'

const oaaChat = combineReducers({ 
	session, accountActivate, form 
})

export default oaaChat