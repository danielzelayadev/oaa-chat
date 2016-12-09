import React from 'react'
import { observer } from 'mobx-react'
import styles from './Drawer.css'

const Drawer = ({ show, closing, children }) => (
	<div class={`${styles.root} ${ closing ? styles.close : '' } ${ !show ? styles.hidden : '' }`}>
		{children}
	</div>
)

export default observer(Drawer)