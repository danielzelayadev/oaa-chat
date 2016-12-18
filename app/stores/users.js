import { observable, computed, action } from 'mobx'
import axios from 'axios'
import { SessionStore } from '.'
import { auth } from '../utils'
import { API } from '../constants'

class UsersStore {
	@observable users

	@action async fetch () {
		try {
			const response = await axios.get(`${API}/users`, auth(SessionStore.token))
			this.users = response.data
		} catch (e) {
			console.error(e)
		}
	}
}

export default new UsersStore