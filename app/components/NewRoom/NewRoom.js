import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { SessionStore, NewRoomStore } from '../../stores'
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

const Test = observer(props => (<TextField {...props}/>))

@observer class NewRoom extends Component {
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
			<div>
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
				                      backgroundColor="#493553">
					<i class="material-icons">arrow_forward</i>
				</FloatingActionButton>
			</div>
		)
	}
}

export default NewRoom