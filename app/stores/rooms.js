import { observable, computed, action } from 'mobx'
import axios from 'axios'
import { SessionStore } from '.'
import { auth, get, cache } from '../utils'
import { API } from '../constants'

class RoomsStore {
	@observable openRoom = null
	@observable rooms = get('rooms')

	@action async fetch () {
		if (this.rooms)
			return

		console.log('Fetching Rooms')
		
		try {
			const response = await axios.get(`${API}/rooms`, auth(SessionStore.token))
			this.rooms = response.data
			cache('rooms', this.rooms.slice())
		} catch (e) {
			console.error(e)
		} finally {

		}
	}
}

export default new RoomsStore