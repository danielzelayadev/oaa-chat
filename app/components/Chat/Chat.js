import React, { Component } from 'react'
import { observer } from 'mobx-react'
import styles from './Chat.css'

@observer class Chat extends Component {
	render () {
		const { className, room } = this.props

		return (
			<div class={className}>
			</div>
		)
	}
}

export default Chat