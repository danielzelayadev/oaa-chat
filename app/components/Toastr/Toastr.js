import React from 'react'
import styles from './Toastr.css'

const DEFAULT_TIMEOUT = 5

const getStyles = (str, def) => {
	if (str) {
		const style = styles[str]

		if (style)
			return style
	}

	return styles[def]
}

const getTypeStyles = type => getStyles(type, 'success')
const getPosStyles = pos => getStyles(pos, 'tr')

class Toastr extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			show: props.show,
			hide: !props.show,
			counter: 0
		}
	}

	componentDidMount () {
    	this.interval = setInterval(this.tick.bind(this), 1000)
	}

	componentWillUnmount () {
		clearInterval(this.interval)
	}

	tick () {
		const timeout = this.props.timeout ? this.props.timeout : DEFAULT_TIMEOUT
		this.state = { ...this.state, counter: this.state.counter + 1 }

	    if (this.state.counter >= timeout)
	    	this.kill()
	}

	kill (e) {
		clearInterval(this.interval)
	    this.setState({ ...this.state, show: false })
	    setTimeout(() => { this.setState({ ...this.state, hide: true }) }, 1100)
	}

	render () {
		const { type, title, message, pos } = this.props
		const { hide, show } = this.state

		return (
			<div>
				{
					hide ? null :
					<div class={`${styles.root} ${getTypeStyles(type)} ${getPosStyles(pos)} ${ show ? '' : styles.hidden }`}
					     onClick={this.kill.bind(this)}>
					    <i class={`material-icons ${styles.icon}`}>{ !type || type === "success" ? "check" : type }</i>
					    <i class={`material-icons ${styles.clear}`}>clear</i>
						<h3>{title}</h3>
						<p>{message}</p>
					</div>
				}
			</div>
		)
	}
}

export default Toastr