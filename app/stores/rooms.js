import { observable, computed, action } from 'mobx'
import axios from 'axios'
import { SessionStore } from '.'
import { auth } from '../utils'
import { API } from '../constants'

class RoomsStore {
	@observable openRoom = null
	@observable rooms

	@action async fetch () {
		try {
			const response = await axios.get(`${API}/rooms`, auth(SessionStore.token))
			this.rooms = response.data
		} catch (e) {
			console.error(e)
		}
	}
}

export default new RoomsStore