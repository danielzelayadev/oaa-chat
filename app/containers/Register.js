import { connect } from 'react-redux'
import { RegisterForm } from '../components'
import { register } from '../actions'

const Register = connect(state => ({
	success: state.register.success,
	loading: state.register.pending,
	err: state.register.error
}), { register })(RegisterForm)

export default Register