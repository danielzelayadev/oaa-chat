import { REGISTER, REGISTER_SUCCESS, REGISTER_FAILURE } from '../actions'

const initialState = {
	success: false,
	pending: false,
	error: ''
}

const register = (state = initialState, action) => {
	switch (action.type) {
		case REGISTER:
			return { ...state, pending: true, success: false, error: '' }
		case REGISTER_SUCCESS:
			return { ...state, success: true, pending: false }
		case REGISTER_FAILURE:
			return { ...state, error: action.error, success: false, pending: false }
		default:
			return state
	}
}

export default register