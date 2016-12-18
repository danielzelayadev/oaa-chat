import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { RoomsStore } from '../../stores'
import Divider from 'material-ui/Divider'
import {List, ListItem} from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors'
import Search from 'material-ui/svg-icons/action/search'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import Subheader from 'material-ui/Subheader'
import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import styles from './MyRoomsList.css'

const iconButtonElement = (
  <IconButton
    touch={true}
    tooltip="more"
    tooltipPosition="bottom-left">
    <MoreVertIcon color={grey400} />
  </IconButton>
)

let closedRooms, openRooms

@observer class MyRoomsList extends Component {

	componentWillMount () {
		closedRooms = [ ...RoomsStore.rooms ]
		openRooms = []
	}

	constructor (props) {
		super(props)
		this.state = {
			searchText: '',
			visibleRooms: []
		}
	}

	roomClicked (room) {
		const res = closedRooms.filter(e => e.title === room.title)
		const index = closedRooms.indexOf(res[0])

		if (index >= 0) {
			openRooms.push(res[0])
			closedRooms.splice(index, 1)
		}

		this.props.onRoomOpen(room)

		this.setState({ ...this.state, searchText: '', visibleRooms: openRooms })
	}

	searchTextChange(e) {
		const text = e.target.value

		if (!text.length)
			this.setState({ ...this.state, searchText: '', visibleRooms: openRooms })
		else {
			const regex = new RegExp(text, "i")
			this.setState({ ...this.state, searchText: text,
				            visibleRooms: closedRooms.filter(e => regex.test(e.title)) })
		}
	}

	searchBtnClicked() {
		if (!this.state.searchText.length)
			this.setState({ ...this.state, visibleRooms: closedRooms })
	}

	closeRoom (room) {
		const index = openRooms.indexOf(room)

		closedRooms.push(room)
		openRooms.splice(index, 1)

		this.setState({ ...this.state, visibleRooms: openRooms })
	}

	getSecondaryText (room) {
		// const { sender: { username }, body } = room.messages[room.messages.length - 1]
		// return (
		// 	<p>
	 //          <span style={{color: darkBlack}}>{username}</span> --
	 //          {body}
	 //        </p>
		// )
		return (<p><span style={{color: darkBlack}}>wupa9</span> --
			Hello, this a very cool and official message from me, wupa9!
			Please talk to me!</p>)
	}

	render () {
		const { className } = this.props
		const { searchText, visibleRooms } = this.state
		return (
			<div class={`${className}`} >
				<div class={styles.searchArea}>
					<IconButton style={{ zIndex: 1, left: 17 }} iconStyle={{ color: '#C5C5C5' }}
					            onClick={this.searchBtnClicked.bind(this)}>
						<Search />
					</IconButton>
					<label class={styles.roomSearch}>
						<input type="text" class={styles.input}
						       value={searchText} onChange={this.searchTextChange.bind(this)}
						       placeholder="Search your rooms" />
					</label>
				</div>
				<div class={styles.rooms}>
					<List>
						{ openRooms.length ? <Subheader>Open Rooms</Subheader> : null }
						{ 
							visibleRooms.map((e, key) =>
								<div key={key}>
									<ListItem primaryText={e.title}
									secondaryText={this.getSecondaryText(e)}
									secondaryTextLines={2}
									onClick={this.roomClicked.bind(this, e)} 
									leftAvatar={<Avatar src={e.avatar} />}
									rightIconButton={
										 <IconMenu iconButtonElement={iconButtonElement}>
										    <MenuItem onClick={this.closeRoom.bind(this, e)}>Archive Room</MenuItem>
										    <MenuItem>Exit Room</MenuItem>
										    <MenuItem>Delete Room</MenuItem>
										  </IconMenu>
									} />
									<Divider inset={true} />
								</div>
							)
						}
					</List>
				</div>
			</div>
		)
	}
}

export default MyRoomsList