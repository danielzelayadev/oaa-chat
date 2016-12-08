import { ACTIVATE, ACTIVATE_SUCCESS, ACTIVATE_FAILURE } from '../actions'

const initialState = {
	success: false,
	pending: false,
	error: ''
}

const accountActivate = (state = initialState, action) => {
	switch (action.type) {
		case ACTIVATE:
			return { ...state, pending: true, success: false, error: '' }
		case ACTIVATE_SUCCESS:
			return { ...state, success: true, pending: false }
		case ACTIVATE_FAILURE:
			return { ...state, error: action.error, success: false, pending: false }
		default:
			return state
	}
}

export default accountActivate