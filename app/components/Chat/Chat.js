import React, { Component } from 'react'
import { observer } from 'mobx-react'
import ContentEditable from 'react-contenteditable'
import Mood from 'material-ui/svg-icons/social/mood'
import Send from 'material-ui/svg-icons/content/send'
import IconButton from 'material-ui/IconButton'
import chatPattern from '../../res/chat-pattern.png'
import styles from './Chat.css'

const messagesStyles = {
	backgroundImage: `url(${chatPattern})`
}

const emojiBtnStyles = {
	marginRight: 20
}

const sendBtnStyles = {
	marginLeft: 20
}

@observer class Chat extends Component {
	constructor (props) {
		super(props)
		this.state = {
			message: ''
		}
	}
	updateMessage (e) {
		this.setState({ 
			...this.state, 
			message: e.target.value
		})
	}
	sendMessage () {
		const { message } = this.state
	}
	onKeyPress (e) {
		if (!e.shiftKey && e.which === 13) {
			e.preventDefault()
			this.sendMessage()
			this.setState({ ...this.state, message: '' })
		}
	}
	render () {
		const { className, room } = this.props
		const { message } = this.state
		return (
			<div class={`${styles.root} ${className}`}>
				<div class={styles.messages} style={messagesStyles}>
					
				</div>
				<div class={styles.footer}>
					<div class={styles.blockCompose}>
						<IconButton class={styles.emojiBtn} style={emojiBtnStyles}>
							<Mood color='#999694' />
						</IconButton>
						<div class={styles.inputContainer}>
							<div style={{ position: 'relative' }}>
								<div class={styles.inputPlaceholder} 
								     style={{ visibility: message.length ? 'hidden' : 'visible' }}>
								     Type a message
								</div>
								<ContentEditable 
									class={styles.input}
									html={message} 
									disabled={false}
									onChange={this.updateMessage.bind(this)}
									onKeyPress={this.onKeyPress.bind(this)} />
							</div>
						</div>
						<IconButton class={styles.sendBtn} style={sendBtnStyles}>
							<Send color='#999694' />
						</IconButton>
					</div>
				</div>
			</div>
		)
	}
}

export default Chat