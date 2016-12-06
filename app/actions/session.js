import axios from 'axios'
import { API } from '../constants'

export const LOGIN = 'LOGIN'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'

export const login = creds => async dispatch => {
	dispatch({ type: LOGIN })
	try {
		const response = await axios.post(`http://localhost:8000/login`, creds)
		dispatch({ type: LOGIN_SUCCESS, token: response.data['token'] })
	} catch ({ response }) {
		dispatch({ type: LOGIN_FAILURE, error: response.data })
	}
}