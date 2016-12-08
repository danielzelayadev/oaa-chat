import axios from 'axios'
import { API } from '../constants'

export const ACTIVATE = 'ACTIVATE'
export const ACTIVATE_SUCCESS = 'ACTIVATE_SUCCESS'
export const ACTIVATE_FAILURE = 'ACTIVATE_FAILURE'

export const activateAccount = hash => async dispatch => {
	dispatch({ type: ACTIVATE })
	try {
		const response = await axios.post(`${API}/users/activate`, hash)
		dispatch({ type: ACTIVATE_SUCCESS })
	} catch (err) {
		const response = err.response
		const error = response ? response.data : err.message
		dispatch({ type: ACTIVATE_FAILURE, error })
	}
}