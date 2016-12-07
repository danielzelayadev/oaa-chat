import React from 'react'
import Halogen from 'halogen'
import { Field, reduxForm } from 'redux-form'
import { Input } from '../Controls'
import Toastr from '../Toastr'
import RaisedButton from 'material-ui/RaisedButton'
import styles from './LoginForm.css'

const validate = ({ email, password }) => {
	const errors = {}

	if (!email)
		errors.email = "Email is required."

	if (!password)
		errors.password = "Password is required."

	return errors
}

const LoginForm = ({ err, loading, login, handleSubmit }) => {
		return (
			<div>
				{ loading ? 
						<Halogen.ClipLoader class={styles.loader} color='#5e8f9b' /> :
					<form onSubmit={handleSubmit(login)}>
			        	<Field name="email" component={Input} floatingLabelText="Email" type="text" />
			        	<Field name="password" component={Input} floatingLabelText="Password" type="password" />
						<RaisedButton style={{ marginTop: '15px' }} type="submit" label="Log In" fullWidth={true} />
						<Toastr title='Authentication Error' type='error' 
						        timeout={5} message={err} show={ err && err.length > 0 } />
					</form> 
				}
			</div>
		)
}

export default reduxForm({ form: 'login', validate })(LoginForm)