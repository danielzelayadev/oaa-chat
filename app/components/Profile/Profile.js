import React, { Component } from 'react'
import { DrawerLabel } from '..'
import Avatar from 'material-ui/Avatar'
import styles from './Profile.css'

const avatarStyles = {
	width: 200,
	height: 200,
	marginLeft: 88,
    marginTop: 32,
    marginRight: 88,
    marginBottom: 6
}

class Profile extends Component {
	render () {
		const { avatar, details } = this.props
		return (
			<div style={{ overflowY: 'auto', height: '100%' }}>
				{ avatar ? <Avatar src={avatar} style={avatarStyles} /> : null}
				{
					details.map((e, i) => (
						<DrawerLabel key={i} name={e.name} value={e.value} />
					))
				}
			</div>
		)
	}
}

export default Profile