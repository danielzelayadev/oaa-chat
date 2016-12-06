import React from 'react'
import { Field, reduxForm } from 'redux-form'
import styles from './LoginForm.css'

const control = ({ input, meta, ...rest }) => (
	<div>
		<input {...input} {...rest} />
	</div>
)

const LoginForm = ({ className, error, loading, login, handleSubmit }) => {
		return (
			<div class={`${styles['login-form']} ${className}`}>
				{ loading ? 
					<p>Loading...</p> :
					<form onSubmit={handleSubmit(login)}>
						<div>
				        	<Field name="email" component={control} type="text" placeholder="Email" />
				        </div>
				        <div>
				          <Field name="password" component={control} type="password" placeholder="Password"  />
				        </div>
						<button type="submit">Submit</button>
					</form> 
				}
				<p>{error}</p>
			</div>
		)
}

export default reduxForm({ form: 'login' })(LoginForm)