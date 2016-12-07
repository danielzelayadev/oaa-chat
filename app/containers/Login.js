import { connect } from 'react-redux'
import { LoginForm } from '../components'
import { login } from '../actions'

const Login = connect(state => ({
	loading: state.session.pending,
	err: state.session.error
}), { login })(LoginForm)

export default Login