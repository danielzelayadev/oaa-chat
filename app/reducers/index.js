import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import session from './session'
import accountActivate from './accountActivate'
import register from './register'

const oaaChat = combineReducers({ 
	session, accountActivate, register, 
	form 
})

export default oaaChat