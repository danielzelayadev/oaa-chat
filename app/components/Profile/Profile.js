import React, { Component } from 'react'
import { DrawerLabel } from '..'
import Avatar from 'material-ui/Avatar'
import {List, ListItem} from 'material-ui/List'
import Divider from 'material-ui/Divider'
import RaisedButton from 'material-ui/RaisedButton'
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
		const { avatar, details, lists, actions } = this.props
		console.log(lists)
		return (
			<div style={{ overflowY: 'auto', height: '100%' }}>
				{ avatar ? <Avatar src={avatar} style={avatarStyles} /> : null}
				{
					details.map((e, i) => (
						<DrawerLabel key={i} name={e.name} value={e.value} />
					))
				}
				{
					lists ? lists.map((l, i) => (
						<List key={i} style={{ overflowY: 'auto', marginTop: 26 }}>
						{
							l.map((item, k) => (
								<div key={k}>
									<ListItem primaryText={item.primaryText}
									leftAvatar={ item.avatar ? <Avatar src={item.avatar}/> : null } />
									<Divider inset={true} />
								</div>
							))
						}
						</List>
					)) : null
				}
				{
					actions ? actions.map((a, i) => (
						<RaisedButton key={i} {...a} style={{ marginTop: 26 }} fullWidth={true} />
					)) : null
				}
			</div>
		)
	}
}

export default Profile