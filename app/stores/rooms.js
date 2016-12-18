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

	@action async addMembers (room, members) {
		try {
			const response = await axios.post(`${API}/rooms/add-users`, 
							{ title: room.title, members: members }, auth(SessionStore.token))
			room = response.data
		} catch (e) {
			const response = e.response

			if (!response)
				console.error(e.message)
			else
				console.error(response.data.message)

			this.error = "The change you made has not been saved. Try reloading."
		}
	}

	@action async removeMembers (room, members) {
		try {
			const response = await axios.post(`${API}/rooms/remove-users`, 
							{ title: room.title, members: members }, auth(SessionStore.token))
			room = response.data
		} catch (e) {
			const response = e.response

			if (!response)
				console.error(e.message)
			else
				console.error(response.data.message)

			this.error = "The change you made has not been saved. Try reloading."
		}
	}
}

export default new RoomsStore