import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import { SessionStore, DrawerStore } from '../../stores'
import { LANDING, Profile, Drawer, DrawerHeader, NewRoom } from '../../components'
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
	{ name: 'Profile', component: <Profile store={SessionStore} /> },
	{ name: 'Friends', component: null }, 
	{ name: 'Rooms', component: null }, 
	{ name: 'People', component: null } 
]

const Options = observer(props => (
	 <IconMenu {...props} menuStyle={{ width: 140 }} 
	 	iconButtonElement={<IconButton iconStyle={{ color: 'white' }}><MoreVertIcon /></IconButton>}
    	targetOrigin={{horizontal: 'right', vertical: 'top'}}
    	anchorOrigin={{horizontal: 'right', vertical: 'top'}}>
    	{ leftPaneComponents.map((c, i) => (
    		<MenuItem key={i} primaryText={c.name} onClick={e => drawerStore.setDrawer(c.name) } />
    	)) }
	    <MenuItem primaryText="Log out" onClick={logout} />
 	 </IconMenu>
))

const renderDrawerContent = () => {
	const res = leftPaneComponents.filter(e => e.name === drawerStore.drawer)[0]
	return res ? res.component : null
}

let drawerStore

@observer class Home extends Component {
	componentWillMount() {
		drawerStore = new DrawerStore
	}

	render () {
		return (
			<div class={styles.root}>
				<div class={styles.leftPane}>
					<AppBar style={appBarStyles}	
					        iconElementLeft={<Avatar src={SessionStore.user.avatar} style={avatarStyles} 
					        onClick={e => drawerStore.setDrawer("Profile")} />}
					        iconElementRight={<Options/>} />
						<Drawer show={ drawerStore.drawerIsOpen } closing={drawerStore.drawerClosing}>
							<DrawerHeader title={drawerStore.drawer} close={() => drawerStore.closeDrawer()} />
							{ renderDrawerContent() }
						</Drawer>
				</div>
				<div class={styles.rightPane}>
				</div>
			</div>
		)
	}
}

export default Home