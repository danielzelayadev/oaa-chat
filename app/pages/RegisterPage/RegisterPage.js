import React from 'react'
import { Link } from 'react-router'
import { Register } from '../../containers'
import { LANDING } from '../../components/Routes'
import IconButton from 'material-ui/IconButton'

const RegisterPage = () => (
	<div>
		<Link to={LANDING}>
			<IconButton iconClassName="material-icons" iconStyle={{color: '#7B85AD'}}>
				arrow_back
			</IconButton>
		</Link>
		<Register />
	</div>
)

export default RegisterPage