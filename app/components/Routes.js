import React from 'react'
import { Router, Route, browserHistory } from 'react-router'
import { Landing, ActivateAccount, RegisterPage } from '../pages'
import App from './App'

export const LANDING = '/'
export const ACTIVATE_ACCOUNT = '/activate-account'
export const REGISTER = '/register'

const Routes = () => (
	<Router history={browserHistory}>
		<Route component={App}>
			<Route path={LANDING} component={Landing} />
			<Route path={ACTIVATE_ACCOUNT} component={ActivateAccount} />
			<Route path={REGISTER} component={RegisterPage} />
		</Route>
	</Router>
)

export default Routes