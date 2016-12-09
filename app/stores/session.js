import { observable, computed, action } from 'mobx'
import axios from 'axios'
import { API } from '../constants'

class SessionStore {
	@observable token
	@observable user
	@observable error
	@observable loggedIn = false
	@observable pending = false
	@observable loginFailed = false

	@computed get fullname() {
		return this.user ? `${this.user.firstname} ${this.user.lastname}` : ''
	}

	@action async login (creds) {
		if (this.loggedIn || this.pending)
			return

		this.pending = true
		this.loginFailed = false

		try {
			const response = await axios.post(`${API}/login`, creds)
			const { token, ...user } = response.data
			this.token = token
			this.user = user
			this.loggedIn = true
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
		this.token = ""
		this.user = undefined
		this.loggedIn = false
	}

}

export default new SessionStore