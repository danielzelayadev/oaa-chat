import { LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE } from '../actions'

const initialState = {
	token: '',
	pending: false,
	error: ''
}

const session = (state = initialState, action) => {
	switch (action.type) {
		case LOGIN:
			return { ...state, pending: true, error: '' }
		case LOGIN_SUCCESS:
			return { ...state, token: action.token, pending: false }
		case LOGIN_FAILURE:
			return { ...state, error: action.error, pending: false }
		default:
			return state
	}
}

export default session