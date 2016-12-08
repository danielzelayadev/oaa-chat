import React from 'react'
import Halogen from 'halogen'
import { Field, reduxForm } from 'redux-form'
import Toastr from '../Toastr'
import { Input } from '../Controls'
import RaisedButton from 'material-ui/RaisedButton'
import styles from './ActivateAccountForm.css'

const validate = ({ hash }) => {
	const errors = {}

	if (!hash)
		errors.hash = 'Activation code is required.'

	return errors
}

const ActivateAccountForm = ({ activateAccount, success, loading, err, handleSubmit, dirty }) => {
	return (
		<div>
			{ loading ? 
				<Halogen.ClipLoader class={styles.loader} color='#5e8f9b' /> :
				<form class={styles.root} onSubmit={handleSubmit(activateAccount)}>
					<Field name="hash" component={Input} fullWidth={true} 
					       floatingLabelText="Activation Code" type="text" />
					<RaisedButton style={{ marginTop: '15px' }} type="submit" label="Activate" fullWidth={true} />
					<Toastr title='Activation Error' type='error' 
					        timeout={5} message={err} show={ dirty && err && err.length > 0 } />
					<Toastr title='Success' type='success' timeout={5} 
					        message="Account successfully activated!" 
					        show={ dirty && success } />
				</form> 
			}
		</div>
	)
}

export default reduxForm({ form: 'activateAccount', validate })(ActivateAccountForm)