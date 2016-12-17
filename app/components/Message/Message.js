import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { emojiConfig } from '../../constants'
import ReactEmoji from 'react-emoji'
import Download from 'material-ui/svg-icons/file/file-download'
import IconButton from 'material-ui/IconButton'
import styles from './Message.css'

@observer class Message extends Component {
	downloadFile ({ data, name, type }) {
		download(data, name, type)
	}
	render () {
		const { body, attachment, sent } = this.props
		return (
			<div class={`${styles.msg} ${styles.msgContinuation}`}>
				<div class={styles.message} 
				     style={{ backgroundColor: sent ? '#DCF8C6' : '#FFF', 
			                  float: sent ? 'right' : 'left' }}>
					{
						attachment ?
						<div onClick={this.downloadFile.bind(this, attachment)}
						     title={`Download "${attachment.name}"`}>
							{
								attachment.type.includes('image/') ?
								<div class={styles.bubbleImage}>
									<div class={styles.imageThumb}>
										<img src={attachment.data} />
									</div>
								</div>
								:
								<div class={`${styles.bubble} ${styles.bubbleDoc}`}>
									<div class={styles.documentContainer} 
									     title={`Download "${attachment.name}"`}>
										<div class={styles.documentBody}>
											<div class={styles.documentText}>
												<span>{attachment.name}</span>
											</div>
											<IconButton><Download/></IconButton>
										</div>
									</div>
								</div>
							}
						</div>
						:
						<div class={styles.bubble}>
							<div class={styles.messageText}>
								{ReactEmoji.emojify(body, emojiConfig)} 
							</div>
						</div>
					}
				</div>
			</div>
		)
	}
}

export default Message