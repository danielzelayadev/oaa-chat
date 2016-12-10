import React, { Component } from 'react'
import { SessionStore, DrawerStore } from '../../stores'
import { Profile, Drawer, DrawerHeader } from '..'
import { getUserProfileProps, drawerIsOpen } from '../../utils'
import { FilterList } from '../../components'
import { observer } from 'mobx-react'

let drawerId, drawerTitle, profileProps

const getItems = () => {
	const { user: { friends } } = SessionStore
	return friends.map(e => ({ primaryText: e.username, avatar: e.avatar, data: e }))
}

const listItemProps = {

}

const onListItemClick = friend => {
	drawerTitle = `${friend.firstname} ${friend.lastname}'s Profile`
	profileProps = getUserProfileProps(friend)
	drawerId = DrawerStore.push()
}

const Friends = props => {
	return (
		<div style={{ height: '100%' }}>
			<FilterList items={getItems()} hintText="Type friend name"
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

export default observer(Friends)