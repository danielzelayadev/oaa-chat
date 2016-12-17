import { observable, computed, action } from 'mobx'
import axios from 'axios'
import { SessionStore } from '.'
import { auth } from '../utils'
import { API } from '../constants'

class RoomsStore {
	@observable openRoom = undefined
	@observable rooms = []

	@action async fetch () {
		const response = await axios.get(`${API}/rooms`, auth(SessionStore.token))
		this.rooms = response.data
	}
}

export default new RoomsStore