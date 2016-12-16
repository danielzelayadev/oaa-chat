import React, { Component } from 'react'
import { observer } from 'mobx-react'
import TextField from 'material-ui/TextField'
import {List, ListItem} from 'material-ui/List'
import Divider from 'material-ui/Divider'
import Avatar from 'material-ui/Avatar'
import styles from './FilterList.css'

@observer class FilterList extends Component {
	constructor(props) {
		super(props)
		this.state = {
			filter: ''
		}
	}
	listItemClicked (data) {
		const { onListItemClick } = this.props
		if (typeof onListItemClick === 'function')
			onListItemClick(data)
	}

	render () {
		const { filter } = this.state
		const { items, hintText, listItemProps } = this.props
		const regex = new RegExp(filter, "i")
		const filteredItems = items.filter(e => !filter || regex.test(e.primaryText))
		return (
			<div style={{ height: '100%' }}>
				<div style={{ marginLeft: 32, marginTop: 25, height: '7.8%' }}>
					<TextField hintText={hintText} fullWidth={true}  value={filter} 
					           onChange={e => this.setState({ filter: e.target.value }) } />
				</div>
				<List style={{ overflowY: 'auto', height: '85%' }}>
					{
						filteredItems.map((item, i) => (
							<div key={i}>
								<ListItem primaryText={item.primaryText}
								onClick={this.listItemClicked.bind(this, item.data)}
								leftAvatar={ item.avatar ? <Avatar src={item.avatar}/> : null }
								{...listItemProps} />
								<Divider inset={true} />
							</div>
						))
					}
				</List>
			</div>
		)
	}
}

export default FilterList