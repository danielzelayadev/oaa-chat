import { observable, autorun, action } from 'mobx'
import { trimTime } from '../utils'
import axios from 'axios'
import { API } from '../constants'

class RegisterStore {
	@observable error
	@observable pending = false
	@observable registerFailed = false

	@action async register (user) {
		if (this.pending)
			return

		user.birthday = trimTime(user.birthday.toJSON())

		this.pending = true
		this.registerFailed = false

		try {
			await axios.post(`${API}/users`, user)
		} catch (e) {
			const response = e.response

			if (!response) {
				this.error = "Something went wrong."
				console.error(e.message)
			} else
				this.error = response.data.message

			this.registerFailed = true
		} finally {
			this.pending = false
		}
	}

	@action clear () {
		this.error = ""
		this.pending = false
		this.registerFailed = false
	}
}

export default new RegisterStore