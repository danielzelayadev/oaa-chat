import React, { Component } from 'react'
import { UIStore } from '../../stores'
import { observer } from 'mobx-react'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import AppBar from 'material-ui/AppBar'
import Avatar from 'material-ui/Avatar'
import IconMenu from 'material-ui/IconMenu'
import IconButton from 'material-ui/IconButton'
import MenuItem from 'material-ui/MenuItem'
import styles from './Home.css'
import avatar from './pp.jpg'

const headerStyles = {
	position: 'absolute'
}

const avatarStyles = {
	cursor: 'pointer',
	marginTop: 4,
	marginLeft: 6
}

const Options = props => (
	 <IconMenu {...props} menuStyle={{ width: 140 }} 
	 	iconButtonElement={<IconButton iconStyle={{ color: 'white' }}><MoreVertIcon /></IconButton>}
    	targetOrigin={{horizontal: 'right', vertical: 'top'}}
    	anchorOrigin={{horizontal: 'right', vertical: 'top'}}>
	    <MenuItem primaryText="New Room" />
	    <MenuItem primaryText="Profile" />
	    <MenuItem primaryText="Friends" />
	    <MenuItem primaryText="Rooms" />
	    <MenuItem primaryText="People" />
	    <MenuItem primaryText="Log out" />
 	 </IconMenu>
)

@observer class Home extends Component {
	render () {
		return (
			<div class={styles.root}>
				<div class={styles.leftPane}>
					<AppBar style={headerStyles} 	
					        iconElementLeft={<Avatar src={avatar} style={avatarStyles} />}
					        iconElementRight={<Options/>} />
				</div>
				<div class={styles.rightPane}>
				</div>
			</div>
		)
	}
}

export default Home