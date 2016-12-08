import React from 'react'
import { Link } from 'react-router'
import { ActivateAccountContainer } from '../../containers'
import { LANDING } from '../../components/Routes'
import IconButton from 'material-ui/IconButton'

const ActivateAccount = () => (
	<div>
		<Link to={LANDING}>
			<IconButton iconClassName="material-icons" iconStyle={{color: '#7B85AD'}}>
				arrow_back
			</IconButton>
		</Link>
		<ActivateAccountContainer />
	</div>
)

export default ActivateAccount