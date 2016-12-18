import React, { Component } from 'react'
import { SessionStore, RoomsStore, DrawerStore } from '../../stores'
import { Profile, Drawer, DrawerHeader } from '..'
import { getRoomProfileProps, drawerIsOpen } from '../../utils'
import { FilterList } from '../../components'
import { observer } from 'mobx-react'

let drawerId, drawerTitle, profileProps

const getItems = () => {
	const { rooms } = RoomsStore
	return rooms.map(e => ({ primaryText: e.title, avatar: e.avatar, data: e }))
}

const listItemProps = {

}

const onListItemClick = room => {
	const isInRoom = SessionStore.isInRoom(room)
	drawerTitle = room.title
	profileProps = getRoomProfileProps(room)
	profileProps.actions = [
		{ label: isInRoom ? 'Exit' : 'Join', 
		  backgroundColor: isInRoom ? '#B71C1C' : '#fff', 
		  labelColor: isInRoom ? '#fff' : '#000',
		  onClick: () => {
		  	if (isInRoom)
		  		SessionStore.exit(room)
		  	else
		  		SessionStore.join(room)
		  	DrawerStore.pop()
		  } 
		}
	]
	drawerId = DrawerStore.push()
}

const Rooms = props => {
	return (
		<div style={{ height: '100%' }}>
			<FilterList items={getItems()} hintText="Type room name"
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