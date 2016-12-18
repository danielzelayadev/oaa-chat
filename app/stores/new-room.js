import { observable, computed, action } from 'mobx'
import axios from 'axios'
import { auth, get, cache } from '../utils'
import { API } from '../constants'
import { SessionStore, RoomsStore } from '.'

class NewRoomStore {
	@observable avatar = null
	@observable name = ""
	@observable members = []

	@observable avatarData = null

	@observable error
	@observable pending = false
	@observable failed = false

	@action readAvatarData () {
		if (!this.avatar) return undefined

		const reader = new FileReader()

	    reader.onload = e => this.avatarData = reader.result
	    reader.readAsDataURL(this.avatar)
	}

	@action addMember (username) {
		this.members = [ ...this.members, username ]
	}

	@action removeMember (username) {
		this.members = this.members.filter(e => e !== username)
	}
 
	@action async create () {
		try {
			const response = await axios.post(`${API}/rooms`, 
							{ title: this.name, avatar: this.avatarData,
							  members: this.members.slice(), visibility: 'public' }, 
							  auth(SessionStore.token))

			if (typeof RoomsStore.rooms !== 'array')
				RoomsStore.rooms = []

			RoomsStore.rooms.push(response.data)
			SessionStore.user.rooms.push(response.data)
		} catch (e) {
			const response = e.response

			if (!response)
				console.error(e.message)
			else
				console.error(response.data.message)

			this.error = "The change you made has not been saved. Try reloading."
		}
	}

	@action clear () {
		this.admin = null
		this.avatar = null
		this.name = ""
		this.members = []

		this.avatarData = null

		this.error = null
		this.pending = false
		this.failed = false
	}
}

export default new NewRoomStore