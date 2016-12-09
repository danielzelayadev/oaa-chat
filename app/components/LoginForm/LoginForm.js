import React from 'react'
import Halogen from 'halogen'
import { browserHistory } from 'react-router'
import { HOME } from '../Routes'
import { observer } from 'mobx-react'
import styles from './LoginForm.css'
import { SessionStore } from '../../stores'
import { plugins } from '../../constants'
import MobxReactForm from 'mobx-react-form'
import RaisedButton from 'material-ui/RaisedButton'
import Toastr from '../Toastr'
import { Input } from '../Controls'


const fields = {
  email: { label: 'Email', rules: 'required' },
  password: { label: 'Password', rules: 'required' }
}

class Form extends MobxReactForm {
	async onSuccess (form) {
		await SessionStore.login(form.values())

		if (SessionStore.loggedIn)
			browserHistory.push(HOME)
	}
	onError (form) {}
}

let form

@observer class LoginForm extends React.Component {
	componentWillMount() {
		form = new Form({ fields, plugins })
	}
	render () {
		const { pending, error, loginFailed } = SessionStore
		return (
			<div>
				{ pending ? 
					<Halogen.ClipLoader class={styles.loader} color='#5e8f9b' /> :
					<form class={styles.root} onSubmit={form.onSubmit}>
						<Input field={form.$('email')} />
						<Input field={form.$('password')} type="password" />
						<RaisedButton style={{ marginTop: '15px' }} type="submit"
						              label="Log In" fullWidth={true} />
						<Toastr title='Authentication Error' type='error' 
						        timeout={5} message={error} 
						        show={ form.isDirty && loginFailed } />
					</form> 
				}
			</div>
		)
	}
}

export default LoginForm