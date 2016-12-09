import React from 'react'
import { Router, Route, browserHistory } from 'react-router'
import { Landing, ActivateAccount, RegisterPage, Home } from '../pages'
import App from './App'

export const LANDING = '/'
export const ACTIVATE_ACCOUNT = '/activate-account'
export const REGISTER = '/register'
export const HOME = '/home'

const Routes = () => (
	<Router history={browserHistory}>
		<Route component={App}>
			<Route path={LANDING} component={Landing} />
			<Route path={ACTIVATE_ACCOUNT} component={ActivateAccount} />
			<Route path={REGISTER} component={RegisterPage} />
			<Route path={HOME} component={Home} />
		</Route>
	</Router>
)

export default Routes