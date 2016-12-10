import React from 'react'
import { observer } from 'mobx-react'
import styles from './Drawer.css'

const Drawer = ({ closing, children }) => (
	<div class={`${styles.root} ${ closing ? styles.close : '' }`}>
		{children}
	</div>
)

export default observer(Drawer)