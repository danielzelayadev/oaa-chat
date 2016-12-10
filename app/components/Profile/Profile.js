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
		const { user } = this.props.store
		return (
			<div style={{ overflowY: 'auto', height: '100%' }}>
				<Avatar src={user.avatar} style={avatarStyles} />
				<DrawerLabel name="Email" value={user.email} />
				<DrawerLabel name="Username" value={user.username} />
				<DrawerLabel name="Name" value={this.props.store.fullname} />
				<DrawerLabel name="Age" value={user.age} />
				<DrawerLabel name="Birthday" value={user.birthday} />
			</div>
		)
	}
}

export default Profile