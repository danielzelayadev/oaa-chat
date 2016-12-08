import React from 'react'
import { Router, Route, browserHistory } from 'react-router'
import { Landing, ActivateAccount } from '../pages'
import App from './App'

export const LANDING = '/'
export const ACTIVATE_ACCOUNT = '/activate-account'

const Routes = () => (
	<Router history={browserHistory}>
		<Route component={App}>
			<Route path={LANDING} component={Landing} />
			<Route path={ACTIVATE_ACCOUNT} component={ActivateAccount} />
		</Route>
	</Router>
)

export default Routes