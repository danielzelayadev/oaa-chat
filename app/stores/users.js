import { observable, computed, action } from 'mobx'
import axios from 'axios'
import { SessionStore } from '.'
import { auth } from '../utils'
import { API } from '../constants'

class UsersStore {
	@observable users = []

	@action async fetch () {
		const response = await axios.get(`${API}/users`, auth(SessionStore.token))
		this.users = response.data
	}
}

export default new UsersStore