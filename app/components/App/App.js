import React from 'react'
import { Router, Route, browserHistory } from 'react-router'
import { Landing, ActivateAccount } from '../../pages'
import { LANDING, ACTIVATE_ACCOUNT } from '../../constants'
import styles from './App.css'

const App = () => (
	<div class={styles['chat-wrapper']}>
		<Router history={browserHistory}>
			<Route path={LANDING} component={Landing} />
			<Route path={ACTIVATE_ACCOUNT} component={ActivateAccount} />
		</Router>
	</div>
)

export default App