import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { SessionStore, DrawerStore } from '../../stores'
import TextField from 'material-ui/TextField'
import {List, ListItem} from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import styles from './AddRoomParticipants.css'

@observer class AddRoomParticipants extends Component {
	addMember (username) {
		const { store } = this.props

		if (store.members.indexOf(username) >= 0)
			store.removeMember(username) 
		else
			store.addMember(username) 
	}

	createRoom () {
		const { store } = this.props
		store.create()
		DrawerStore.pop(0)
	}

	render () {
		const { store } = this.props
		const { filteredFriends, friendsFilter } = SessionStore
		const showSubmit = store.members.length > 0
		return (
			<div style={{ height: '100%' }}>
				<div style={{ marginLeft: 32, marginTop: 25, height: '7.8%' }}>
					<TextField hintText="Type friend name" fullWidth={true} 
					           value={friendsFilter} onChange={e => SessionStore.friendsFilter = e.target.value} />
				</div>
				<List style={{ overflowY: 'auto', height: '56%' }}>
					{
						filteredFriends.map((friend, i) => (
							<ListItem key={i} primaryText={friend.username}
							innerDivStyle={ store.members.indexOf(friend.username) >= 0 ? { background: '#ccc' } : {} }
							onClick={this.addMember.bind(this, friend.username)} 
							leftAvatar={<Avatar src={friend.avatar} />} />))
					}
				</List>
				<div style={{ display: 'flex', justifyContent: 'center', height: '12%' }}>
					<FloatingActionButton className={ showSubmit ? styles.showSubmit : styles.hideSubmit } 
					                      style={{ alignSelf: 'center' }} mini={true}
					                      onClick={this.createRoom.bind(this)}
					                      backgroundColor="#493553">
						<i class="material-icons">check</i>
					</FloatingActionButton>
				</div>
			</div>
		)
	}
}

export default AddRoomParticipants