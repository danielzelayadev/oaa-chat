import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import { SessionStore, DrawerStore } from '../../stores'
import { getUserProfileProps, drawerIsOpen } from '../../utils'
import { LANDING, Profile, Drawer, Friends, People, Rooms, DrawerHeader, NewRoom } from '../../components'
import { observer } from 'mobx-react'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import AppBar from 'material-ui/AppBar'
import Avatar from 'material-ui/Avatar'
import IconMenu from 'material-ui/IconMenu'
import IconButton from 'material-ui/IconButton'
import MenuItem from 'material-ui/MenuItem'
import styles from './Home.css'

const appBarStyles = {
	position: 'absolute',
	backgroundColor: '#493553'
}

const avatarStyles = {
	cursor: 'pointer',	marginTop: 4,
	marginLeft: 6
}

const logout = e => {
	SessionStore.logout()
	browserHistory.push(LANDING)
}

const leftPaneComponents = [ 
	{ name: 'New Room', component: <NewRoom /> }, 
	{ name: 'Profile', component: <Profile {...getUserProfileProps(SessionStore.user)} /> },
	{ name: 'Friends', component: <Friends /> }, 
	{ name: 'Rooms', component: <Rooms /> }, 
	{ name: 'People', component: <People /> } 
]

const pushDrawer = title => {
	drawerTitle = title
	drawerId = DrawerStore.push()
}

const Options = observer(props => (
	 <IconMenu {...props} menuStyle={{ width: 140 }} 
	 	iconButtonElement={<IconButton iconStyle={{ color: 'white' }}><MoreVertIcon /></IconButton>}
    	targetOrigin={{horizontal: 'right', vertical: 'top'}}
    	anchorOrigin={{horizontal: 'right', vertical: 'top'}}>
    	{ leftPaneComponents.map((c, i) => (
    		<MenuItem key={i} primaryText={c.name} onClick={e => pushDrawer(c.name) } />
    	)) }
	    <MenuItem primaryText="Log out" onClick={logout} />
 	 </IconMenu>
))

const renderDrawerContent = () => {
	const res = leftPaneComponents.filter(e => e.name === drawerTitle)[0]
	return res ? res.component : null
}

let drawerStore
let drawerTitle = ""
let drawerId

@observer class Home extends Component {
	render () {
		return (
			<div class={styles.root}>
				<div class={styles.leftPane}>
					<AppBar style={appBarStyles}	
					        iconElementLeft={<Avatar src={SessionStore.user.avatar} style={avatarStyles} 
					        onClick={e => pushDrawer("Profile")} />}
					        iconElementRight={<Options/>} />
						{
							drawerIsOpen(drawerId, DrawerStore.drawers) ?
							<Drawer closing={DrawerStore.drawerClosing == drawerId}>
								<DrawerHeader title={drawerTitle} close={() => DrawerStore.pop()} />
								<div style={{ height: '82.439%' }}>
									{ renderDrawerContent() }
								</div>
							</Drawer> : null
						}
				</div>
				<div class={styles.rightPane}>
				</div>
			</div>
		)
	}
}

export default Home