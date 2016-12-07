import React from 'react'
import { Link } from 'react-router'
import { Login } from '../../containers'
import { ACTIVATE_ACCOUNT } from '../../constants'
import FlatButton from 'material-ui/FlatButton'
import styles from './Landing.css'

const flatButtonStyles = {
	position: 'absolute',
	bottom: '10%'
}

const Landing = () => (
	<div class={styles.landing}>
		<Login />
		<FlatButton style={{...flatButtonStyles, left: '10%'}} label="Sign Up" secondary={true} />
		<Link to={ACTIVATE_ACCOUNT}>
			<FlatButton style={{...flatButtonStyles, right: '5%'}} 
		            label="Already registered? Activate account" secondary={true} />
		</Link>
	</div>
)

export default Landing