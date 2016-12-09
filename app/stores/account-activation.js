import { observable, autorun, action } from 'mobx'
import axios from 'axios'
import { API } from '../constants'

class AccountActivationStore {
	@observable pending = false
	@observable activateFailed = false

	@action async activate (hash) {
		if (this.pending)
			return

		this.pending = true
		this.activateFailed = false

		try {
			await axios.post(`${API}/users/activate`, hash)
		} catch (e) {
			const response = e.response

			if (!response) {
				this.error = "Something went wrong."
				console.error(e.message)
			} else
				this.error = response.data

			this.activateFailed = true
		} finally {
			this.pending = false
		}
	}

}

export default new AccountActivationStore