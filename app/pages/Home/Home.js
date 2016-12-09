import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import { SessionStore, UIStore } from '../../stores'
import { LANDING, Profile, Drawer } from '../../components'
import { observer } from 'mobx-react'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import AppBar from 'material-ui/AppBar'
import Avatar from 'material-ui/Avatar'
import IconMenu from 'material-ui/IconMenu'
import IconButton from 'material-ui/IconButton'
import MenuItem from 'material-ui/MenuItem'
import styles from './Home.css'

const headerStyles = {
	position: 'absolute'
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
	{ name: 'New Room', component: null }, 
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
    		<MenuItem key={i} primaryText={c.name} onClick={e => UIStore.setDrawer(c.name) } />
    	)) }
	    <MenuItem primaryText="Log out" onClick={logout} />
 	 </IconMenu>
))

const renderDrawerContent = () => {
	const res = leftPaneComponents.filter(e => e.name === UIStore.drawer)[0]
	return res ? res.component : null
}

@observer class Home extends Component {
	render () {
		return (
			<div class={styles.root}>
				<div class={styles.leftPane}>
					<AppBar style={headerStyles}	
					        iconElementLeft={<Avatar src={SessionStore.user.avatar} style={avatarStyles} 
					        onClick={e => UIStore.setDrawer("Profile")} />}
					        iconElementRight={<Options/>} />
						<Drawer show={ UIStore.drawerIsOpen } closing={UIStore.drawerClosing}>
							<div class={styles.header}>
								<IconButton iconClassName="material-icons" 
								            iconStyle={{color: '#7B85AD'}}
								            style={{ top: '42%' }}
								            onClick={e => UIStore.closeDrawer()}>
									arrow_back
								</IconButton>
								<span class={styles.headerText}>{UIStore.drawer}</span>
							</div>
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