import React from 'react'
import { Link } from 'react-router'
import { Login } from '../../containers'
import { ACTIVATE_ACCOUNT, REGISTER } from '../../components/Routes'
import FlatButton from 'material-ui/FlatButton'

const flatButtonStyles = {
	position: 'absolute',
	bottom: '10%'
}

const Landing = () => (
	<div>
		<Login />
		<Link to={REGISTER}>
			<FlatButton style={{...flatButtonStyles, left: '10%'}} 
					label="Sign Up" secondary={true} />
		</Link>
		<Link to={ACTIVATE_ACCOUNT}>
			<FlatButton style={{...flatButtonStyles, right: '5%'}} 
		            label="Already registered? Activate account" secondary={true} />
		</Link>
	</div>
)

export default Landing