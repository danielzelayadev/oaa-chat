import { observable, computed, action } from 'mobx'
import axios from 'axios'
import { SessionStore } from '.'
import { auth, get, cache } from '../utils'
import { API } from '../constants'

class UsersStore {
	@observable users = get('users')

	@action async fetch () {
		if (this.users)
			return

		console.log('Fetching users')
		
		try {
			const response = await axios.get(`${API}/users`, auth(SessionStore.token))
			this.users = response.data
			cache('users', this.users.slice())
		} catch (e) {
			console.error(e)
		} finally {

		}
	}
}

export default new UsersStore