import React from 'react'
import { observer } from 'mobx-react'
import IconButton from 'material-ui/IconButton'
import styles from './DrawerHeader.css'

const DrawerHeader = ({ title, backgroundColor, color, close }) => (
	<div class={styles.root} style={{ backgroundColor: backgroundColor || '#493553' }}>
		<IconButton iconClassName="material-icons" 
		            iconStyle={{color: color || '#7B85AD'}}
		            style={{ top: '42%' }}
		            onClick={close}>
			arrow_back
		</IconButton>
		<span class={styles.title}>{title}</span>
	</div>
)

export default observer(DrawerHeader)