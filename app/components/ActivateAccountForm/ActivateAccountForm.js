import React from 'react'
import Halogen from 'halogen'
import { observer } from 'mobx-react'
import styles from './ActivateAccountForm.css'
import { AccountActivationStore } from '../../stores'
import { plugins } from '../../constants'
import MobxReactForm from 'mobx-react-form'
import RaisedButton from 'material-ui/RaisedButton'
import Toastr from '../Toastr'
import { Input } from '../Controls'

const fields = {
  code: { label: 'Activation Code', rules: 'required' }
}

class Form extends MobxReactForm {
	onSuccess (form) {
		AccountActivationStore.activate(form.values().code)
	}
	onError (form) {}
}

const form = new Form({ fields, plugins })

@observer class ActivateAccountForm extends React.Component {
	componentWillUnmount() {
		form.clear()
	}

	render () {
		const { activateFailed, pending, error } = AccountActivationStore
		return (
			<div>
				{ pending ? 
					<Halogen.ClipLoader class={styles.loader} color='#5e8f9b' /> :
					<form class={styles.root} onSubmit={form.onSubmit}>
						<Input field={form.$('code')} />
						<RaisedButton style={{ marginTop: '15px' }} type="submit" 
						              label="Activate" fullWidth={true} />
						<Toastr title='Activation Error' type='error' message={error} 
						        show={ form.isDirty && activateFailed } />
						<Toastr title='Success' type='success'
						        message="Account successfully activated!" 
						        show={ form.isDirty && !activateFailed } />
					</form> 
				}
			</div>
		)
	}
}

export default ActivateAccountForm