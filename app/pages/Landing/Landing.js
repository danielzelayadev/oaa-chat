import React from 'react'
import { Login } from '../../containers'
import styles from './Landing.css'

const Landing = () => (
	<div class={styles.landing}>
		<Login class={styles['login-form']} />
	</div>
)

export default Landing