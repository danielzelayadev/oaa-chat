import React from 'react'
import styles from './App.css'
import Paper from 'material-ui/Paper'
import { LANDING, ACTIVATE_ACCOUNT, REGISTER, HOME } from '../Routes'
import { browserHistory } from 'react-router'

const paperStyles = {
  position: "relative",
  background: "#e2f8ff",
  margin: "90px 0"
}

const LANDING_DIMS = {
  	width: 550,
  	height: 450
}

const getPaperDims = (path) => {
	switch (path) {
		case LANDING:
			return LANDING_DIMS
		case ACTIVATE_ACCOUNT:
			return {
			  	width: 400,
			  	height: 350
			}
		case REGISTER:
			return {
			  	width: 400,
			  	height: 720
			}
		case HOME:
			return {
				margin: 0,
				top: 19,
				width: 1276,
				height: 615
			}
	}

	return LANDING_DIMS
}

class App extends React.Component {
	constructor (props) {
		super(props)
		this.state = {
			paperDims: getPaperDims(props.location.pathname)
		}
	}

	componentDidMount () {
		browserHistory
			.listen(({ pathname }) => 
					this.setState({ ...this.state, paperDims: getPaperDims(pathname) }))
	}

	render () {
		const { paperDims } = this.state

		return (
			<div class={styles['chat-wrapper']}>
				<Paper style={{ ...paperStyles, ...paperDims }} zDepth={2} >
					{this.props.children}
				</Paper>
			</div>
		)
	}
} 

export default App