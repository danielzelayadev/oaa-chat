import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { SessionStore, NewRoomStore, DrawerStore } from '../../stores'
import { Drawer, DrawerHeader, AddRoomParticipants } from '..'
import defaultAvatar from '../../res/default-group.png'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import TextField from 'material-ui/TextField'
import styles from './NewRoom.css'

const avatarUploadId = "avatarUpload"

const textFieldStyles = {
    width: '100%'
}

const submitStyles = {
	position: 'absolute',
    left: '40%',
    top: '75%'
}

let drawerStore

@observer class NewRoom extends Component {
	componentWillMount () {
		drawerStore = new DrawerStore
	}

	componentWillUnmount() {
		NewRoomStore.clear()
	}

	componentDidMount() {
		const el = document.getElementById(avatarUploadId)
		el.onchange = () => {
			NewRoomStore.avatar = el.files[0]
			NewRoomStore.readAvatarData()
		}
	}

	uploadWindow (e) {
		document.getElementById(avatarUploadId).click()
	}

	render () {
		const { avatarData, name } = NewRoomStore
		const showSubmit = name.length > 0
		return (
			<div style={{ overflowY: 'auto', height: '100%' }}>
				<div class={styles.avatar} onClick={this.uploadWindow.bind(this)}>
					<input id={avatarUploadId} type="file" style={{visibility: "hidden"}} />
					<img src={ avatarData || defaultAvatar} class={styles.img} />
					<div class={styles.avatarOverlay} 
					      style={ avatarData ? { display: 'none' } : {} } >
						<i class="material-icons">photo_camera</i>
						<div class={styles.avatarOverlayText}>Add Room Avatar</div>
					</div>
				</div>
				<div style={{ marginLeft: 32, marginTop: 26 }}>
					<TextField floatingLabelText="Room Name" value={name}
							   onChange={e => NewRoomStore.name = e.target.value}
					           style={textFieldStyles} />
				</div>
				<FloatingActionButton className={ showSubmit ? styles.showSubmit : styles.hideSubmit } 
				                      style={submitStyles}
				                      onClick={() => drawerStore.setDrawer("Add Room Participants")} 
				                      backgroundColor="#493553">
					<i class="material-icons">arrow_forward</i>
				</FloatingActionButton>
				<Drawer show={ drawerStore.drawerIsOpen } closing={drawerStore.drawerClosing}>
					<DrawerHeader title={drawerStore.drawer} 
					              close={() => { NewRoomStore.members = []; drawerStore.closeDrawer(); }} />
					<AddRoomParticipants store={NewRoomStore} drawer={drawerStore} />
				</Drawer>
			</div>
		)
	}
}

export default NewRoom