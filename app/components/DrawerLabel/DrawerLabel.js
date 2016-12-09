import React from 'react'
import { observer } from 'mobx-react'
import styles from './DrawerLabel.css'

const DrawerLabel = ({ name, value, edittable }) => (
	<div class={styles.root}>
		<div class={styles.name}>{name}</div>
		<div class={styles.value}>{value}</div>
	</div>
)

export default observer(DrawerLabel)