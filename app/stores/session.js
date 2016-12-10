import { observable, computed, action } from 'mobx'
import axios from 'axios'
import { API } from '../constants'

class SessionStore {
	@observable token
	@observable user
	@observable error
	@observable pending = false
	@observable loginFailed = false

	constructor () {
		const userstr = window.localStorage['user']
		const tokenstr = window.localStorage['token']

		this.token = tokenstr ? tokenstr : ""
		this.user = userstr ? JSON.parse(userstr) : ""
	}

	@computed get fullname() {
		return this.user ? `${this.user.firstname} ${this.user.lastname}` : ''
	}

	@computed get loggedIn () {
		return this.user !== ""
	}

	@action async login (creds) {
		if (this.loggedIn || this.pending)
			return

		this.pending = true
		this.loginFailed = false

		try {
			const response = await axios.post(`${API}/login`, creds)
			const { token, ...user } = response.data
			this.token = window.localStorage['token'] = token
			this.user = user
			window.localStorage['user'] = JSON.stringify(user)
		} catch (e) {
			const response = e.response

			if (!response) {
				this.error = "Something went wrong."
				console.error(e.message)
			} else
				this.error = response.data

			this.loginFailed = true
		} finally {
			this.pending = false
		}
	}

	@action logout () {
		this.token = window.localStorage['token'] = ""
		this.user = window.localStorage['user'] = ""
	}

}

export default new SessionStore