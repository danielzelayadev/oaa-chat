import React, { Component } from 'react'
import Halogen from 'halogen'
import { browserHistory } from 'react-router'
import { AppStore, SessionStore, DrawerStore, RoomsStore } from '../../stores'
import { getUserProfileProps, drawerIsOpen } from '../../utils'
import { LANDING, Profile, Drawer, Friends, People, 
	     Rooms, MyRoomsList, DrawerHeader, NewRoom,
	     Chat } from '../../components'
import { observer } from 'mobx-react'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import AttachFile from 'material-ui/svg-icons/editor/attach-file'
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

const pushDrawer = title => {
	drawerTitle = title
	drawerId = DrawerStore.push()
}

const leftPaneComponents = [ 
	{ name: 'New Room', component:  props => <NewRoom {...props} /> }, 
	{ name: 'Profile',  component:  props => <Profile {...props} /> },
	{ name: 'Friends',  component:  props => <Friends {...props} /> }, 
	{ name: 'Rooms',    component:  props => <Rooms   {...props} /> }, 
	{ name: 'People',   component:  props => <People  {...props} /> } 
]

const Options = observer(props => (
	 <IconMenu {...props} 
	 	menuStyle={{ width: 140 }} 
	 	iconButtonElement={
	 		<IconButton iconStyle={{ color: 'white' }}>
	 			<MoreVertIcon />
	 		</IconButton>
	 	}
    	targetOrigin={{horizontal: 'right', vertical: 'top'}}
    	anchorOrigin={{horizontal: 'right', vertical: 'top'}}>
    	{ leftPaneComponents.map((c, i) => (
    		<MenuItem key={i} primaryText={c.name} 
    		          onClick={ e => pushDrawer(c.name) } />
    	)) }
	    <MenuItem primaryText="Log Out" onClick={logout} />
 	 </IconMenu>
))

const renderDrawerContent = () => {
	const res = leftPaneComponents.filter(e => e.name === drawerTitle)[0]
	let props = {}

	if (res.name.includes('Profile'))
		props = getUserProfileProps(SessionStore.user)

	return res ? res.component(props) : null
}

let drawerStore
let drawerTitle = ""
let drawerId

@observer class Home extends Component {
	constructor(props) {
		super(props)
		AppStore.fetch()
	}
	componentDidMount () {
		const el = this.refs.attachFile
		if (el)
			el.onchange = () => {
				const file = el.files[0]
				if (file) {
					const reader = new FileReader()
				    reader.onload = e => 
				    	RoomsStore.openRoom.messages.push({
				    		sender: SessionStore.user.username,
				    		body: '',
				    		attachment: {
				    			name: file.name,
				    			type: file.type,
				    			data: reader.result
				    		}
				    	})
				    reader.readAsDataURL(file)
				}
			}
	}

	sendFile () {
		this.refs.attachFile.click()
	}

	render () {
		const { openRoom } = RoomsStore
		const { loading } = AppStore
		return (
			<span>
				{
					!loading ?
					<div class={styles.root}>
						<div class={styles.leftPane}>
							<AppBar style={appBarStyles}	
							        iconElementLeft={<Avatar src={SessionStore.user.avatar} style={avatarStyles} 
							        onClick={e => pushDrawer("Profile")} />}
							        iconElementRight={<Options/>} />
							<MyRoomsList class={styles.roomList} onRoomOpen={room => RoomsStore.openRoom = room} />
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
						<div class={styles.rightPane}
						     style={{borderLeft: openRoom ? 'none' : '1px solid #77DCFE',
						             width:      openRoom ? '70%'  : '69%' }}>
							{
								openRoom ?
								<div class={styles.rightPaneContent}>
									<AppBar style={appBarStyles} title={openRoom.name}	
									    titleStyle={{ fontSize: 19, marginLeft: 5 }}
								        iconElementLeft={
								        	<Avatar 
								        	src={openRoom.avatar} style={avatarStyles} />
								        }
								        iconElementRight={
								        	<IconButton iconStyle={{ color: 'white' }} 
								        	            tooltip="Send a File"
								        	            onClick={this.sendFile.bind(this)}>
								        		<AttachFile />
								        	</IconButton>
								        }/>
									<Chat class={styles.chat} room={openRoom} />
									<input ref='attachFile' type="file" 
								           style={{visibility: "hidden"}} />
								</div> : null
							}
						</div>
					</div>
					:
					<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
						<Halogen.ClipLoader color='#5e8f9b' />
					</div>
				}
			</span>
		)
	}
}

export default Home