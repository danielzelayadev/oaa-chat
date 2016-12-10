import React, { Component } from 'react'
import { observer } from 'mobx-react'
import defaultAvatar from '../../res/default-group.png'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import TextField from 'material-ui/TextField'
import styles from './NewRoom.css'

const textFieldStyles = {
    width: '100%'
}

const submitStyles = {
	position: 'absolute',
    left: '40%',
    top: '75%'
}

@observer class NewRoom extends Component {
	constructor(props) {
		super(props)
		this.state = {
			roomName: '',
			showSubmit: false
		}
	}

	updateRoomName (e) {
		this.setState({ ...this.state, roomName: e.target.value,
		                showSubmit: e.target.value.length > 0 })
	}

	render () {
		const { roomName, showSubmit } = this.state
		return (
			<div>
				<div class={styles.avatar}>
					<img src={defaultAvatar} class={styles.img} />
					<div class={styles.avatarOverlay}>
						<i class="material-icons">photo_camera</i>
						<div class={styles.avatarOverlayText}>Add Room Avatar</div>
					</div>
				</div>
				<div style={{ marginLeft: 32, marginTop: 26 }}>
					<TextField floatingLabelText="Room Name" value={roomName} 
							   onChange={this.updateRoomName.bind(this)} 
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