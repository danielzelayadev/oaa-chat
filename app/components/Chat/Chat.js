import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { emojiConfig } from '../../constants'
import ReactEmoji from 'react-emoji'
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
		this.scrollBottom = false
		this.state = {
			messages: [],
			message: ''
		}
	}
	componentDidUpdate() {
		if (this.scrollBottom) {
			const { msgs } = this.refs
			msgs.scrollTop = msgs.scrollHeight
			this.scrollBottom = false
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

		if (!message.length)
			return

		this.scrollBottom = true

		this.setState({ 
			...this.state,
			messages: [ ...this.state.messages, { sender: 'wupa9', body: message } ], 
			message: '' 
		})
	}
	onKeyPress (e) {
		if (!e.shiftKey && e.which === 13) {
			e.preventDefault()
			this.sendMessage()
		}
	}
	render () {
		const { className, room } = this.props
		const { message, messages } = this.state
		return (
			<div class={`${styles.root} ${className}`}>
				<div ref="msgs" class={styles.messages} style={messagesStyles}>
					{
						messages.map((msg, i) => (
							<div key={i} class={`${styles.msg} ${styles.msgContinuation}`}>
								<div class={styles.message} 
								     style={{ backgroundColor: '#DCF8C6', 
							              float: 'right' }}>
									<div class={styles.bubble}>
										<div class={styles.messageText}>
											{ReactEmoji.emojify(msg.body, emojiConfig)}
										</div>
									</div>
								</div>
							</div>
						))
					}
				</div>
				<div class={styles.footer}>
					<div class={styles.blockCompose}>
						<IconButton class={styles.emojiBtn} style={emojiBtnStyles} 
						            href='http://emoji.codes/' target='_blank'>
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
						<IconButton class={styles.sendBtn} style={sendBtnStyles} 
						            onClick={this.sendMessage.bind(this)}>
							<Send color='#999694' />
						</IconButton>
					</div>
				</div>
			</div>
		)
	}
}

export default Chat