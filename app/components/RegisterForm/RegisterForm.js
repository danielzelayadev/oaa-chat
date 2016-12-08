import React from 'react'
import Halogen from 'halogen'
import { Field, reduxForm } from 'redux-form'
import { Input } from '../Controls'
import Toastr from '../Toastr'
import RaisedButton from 'material-ui/RaisedButton'
import styles from './RegisterForm.css'

const validate = vals => {
	const errors = {}

	return errors
}

const RegisterForm = ({ handleSubmit, dirty }) => {
		return (
			<div>
				Aqui
			</div>
		)
}

export default reduxForm({ form: 'register', validate })(RegisterForm)