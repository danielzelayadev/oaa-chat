import React from 'react'
import styles from './LoginForm.css'

class LoginForm extends React.Component {

	componentWillMount() {
		this.setState({
			email: '',
			password: ''
		})	
	}

	changeHandler () {

	}

	render () {
		const { className, error, loading, onSubmit } = this.props

		return (
			<div class={`${styles['login-form']} ${className}`}>
				{ loading ? 
					<p>Loading...</p> :
					<form onSubmit={e => {
						e.preventDefault()
						onSubmit({ email: this.state.email, password: this.state.password })
					}}>
						<input type="text" value={this.state.email} onChange={
							e => { this.setState({ email: e.target.value, password: this.state.password }) }
						} placeholder="Email" />
						<input type="password" value={this.state.password} onChange={
							e => { this.setState({ email: this.state.email, password: e.target.value }) }
						} placeholder="Password" />
						<button type="submit">Submit</button>
					</form> 
				}
				<p>{error}</p>
			</div>
		)
	}
}

export default LoginForm