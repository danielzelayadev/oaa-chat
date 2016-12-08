import axios from 'axios'
import { API } from '../constants'

export const REGISTER = 'REGISTER'
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
export const REGISTER_FAILURE = 'REGISTER_FAILURE'

export const register = user => async dispatch => {
	dispatch({ type: REGISTER })
	try {
		const response = await axios.post(`${API}/users`, user)
		dispatch({ type: REGISTER_SUCCESS })
	} catch (err) {
		const response = err.response
		const error = response ? response.data : err.message
		dispatch({ type: REGISTER_FAILURE, error })
	}
}