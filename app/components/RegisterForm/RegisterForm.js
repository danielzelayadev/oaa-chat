import React from 'react'
import Halogen from 'halogen'
import { observer } from 'mobx-react'
import { Input, DatePicker, Select } from '../Controls'
import Toastr from '../Toastr'
import { RegisterStore } from '../../stores'
import { plugins, REGEX_EMAIL, REGEX_PASSWORD } from '../../constants'
import MobxReactForm from 'mobx-react-form'
import RaisedButton from 'material-ui/RaisedButton'
import styles from './RegisterForm.css'

const fields = {
  email: { label: 'Email', rules: `required|regex:${REGEX_EMAIL}` },
  username: { label: 'Username', rules: 'required|min:4|alpha_dash' },
  firstname: { label: 'First Name', rules: `required|alpha` },
  lastname: { label: 'Last Name', rules: `required|alpha` },
  birthday: { label: 'Birthday', value: new Date(), rules: 'required' },
  gender: { label: 'Gender', value: 'Male', rules: 'required' },
  password: { label: 'Password', rules: `required|regex:${REGEX_PASSWORD}` }
}

class Form extends MobxReactForm {
	onSuccess(form) {
		RegisterStore.register(form.values())
	} onError(form){}
}

let form

@observer class RegisterForm extends React.Component {
	componentWillMount () {
		form = new Form({ fields, plugins })
	}
	render () {
		const { registerFailed, pending, error } = RegisterStore

		const genderItems = [ 
			{ value: 'Male', primaryText: 'Male' }, 
			{ value: 'Female', primaryText: 'Female' }
		]

		return (
			<div>
				{
					pending ?
					<Halogen.ClipLoader class={styles.loader} color='#5e8f9b' /> :
					<form class={styles.root} onSubmit={form.onSubmit}>
						<Input field={form.$('email')} />
						<Input field={form.$('username')} />
						<Input field={form.$('firstname')} />
						<Input field={form.$('lastname')} />
						<Input field={form.$('password')} type="password" />
						<Select field={form.$('gender')} options={genderItems} />
						<DatePicker field={form.$('birthday')} maxDate={new Date()} />
						<RaisedButton style={{ marginTop: '15px' }} type="submit" 
						              label="Activate" fullWidth={true} />
						<Toastr title='Registration Error' type='error' message={error} 
						        show={ form.isDirty && registerFailed } />
						<Toastr title='Success' type='success'
						        message="Account successfully registered! Check your email for the activation code." 
						        show={ form.isDirty && !registerFailed } />
					</form> 
				}
			</div>
		)
	}
}

export default RegisterForm