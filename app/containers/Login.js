import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { LoginForm } from '../components'
import { login } from '../actions'

const Login = connect(state => ({
	loading: state.session.pending,
	error: state.session.error
}), { onSubmit: login })(reduxForm({ form: 'LoginForm' })(LoginForm))

export default Login