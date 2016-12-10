import React, { Component } from 'react'
import { SessionStore, UsersStore, DrawerStore } from '../../stores'
import { Profile, Drawer, DrawerHeader } from '..'
import { getUserProfileProps, drawerIsOpen } from '../../utils'
import { FilterList } from '../../components'
import { observer } from 'mobx-react'

let drawerId, drawerTitle, profileProps

const getItems = () => {
	const { users } = UsersStore
	return users.map(e => ({ primaryText: e.username, avatar: e.avatar, data: e }))
}

const listItemProps = {

}

const onListItemClick = user => {
	const isFriend = SessionStore.isFriend(user)
	drawerTitle = `${user.firstname} ${user.lastname}'s Profile`
	profileProps = getUserProfileProps(user)
	profileProps.actions = [
		{ label: isFriend ? 'Unfriend' : 'Friend', 
		  backgroundColor: isFriend ? '#B71C1C' : '#fff', 
		  labelColor: isFriend ? '#fff' : '#000',
		  onClick: () => {
		  	if (isFriend)
		  		SessionStore.unfriend(user)
		  	else
		  		SessionStore.friend(user)
		  	DrawerStore.pop()
		  } 
		}
	]
	drawerId = DrawerStore.push()
}

const Rooms = props => {
	return (
		<div style={{ height: '100%' }}>
			<FilterList items={getItems()} hintText="Type a username"
					onListItemClick={onListItemClick}
	            	listItemProps={listItemProps} />
	        {
	        	drawerIsOpen(drawerId, DrawerStore.drawers) ?
	        	<Drawer closing={DrawerStore.drawerClosing == drawerId}>
					<DrawerHeader title={drawerTitle} close={() => DrawerStore.pop()} />
					<div style={{ height: '82.439%' }}>
						<Profile {...profileProps} />
					</div>
				</Drawer> : null
	        }
		</div>
	)
}

export default observer(Rooms)