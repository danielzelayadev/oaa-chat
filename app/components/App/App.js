import React from 'react'
import { Router, Route, browserHistory } from 'react-router'
import { Landing } from '../../pages'
import styles from './App.css'

const App = () => (
	<div class={styles['chat-wrapper']}>
		<Router history={browserHistory}>
			<Route path='/' component={Landing} />
		</Router>
	</div>
)

export default App