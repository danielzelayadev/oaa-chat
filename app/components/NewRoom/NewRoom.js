import React, { Component } from 'react'
import { observer } from 'mobx-react'
import Avatar from 'material-ui/Avatar'
import styles from './NewRoom.css'

const avatarStyles = {
	width: 200,
	height: 200,
	marginLeft: 88,
    marginTop: 32,
    marginRight: 88,
    marginBottom: 6
}

@observer class NewRoom extends Component {
	render () {
		return (
			<div>
				Yeah
			</div>
		)
	}
}

export default NewRoom