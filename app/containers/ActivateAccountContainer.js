import { connect } from 'react-redux'
import { ActivateAccountForm } from '../components'
import { activateAccount } from '../actions'

const ActivateAccountContainer = connect(state => ({
	success: state.accountActivate.success,
	loading: state.accountActivate.pending,
	err: state.accountActivate.error
}), { activateAccount })(ActivateAccountForm)

export default ActivateAccountContainer