import { observable, computed, action } from 'mobx'
import axios from 'axios'
import { API } from '../constants'

class NewRoomStore {
	@observable admin
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
 
	@action async create () {
		// if (this.pending)
		// 	return

		// this.pending = true
		// this.failed = false

		// try {
		// 	await axios.post(`${API}/users`, user)
		// } catch (e) {
		// 	const response = e.response

		// 	if (!response) {
		// 		this.error = "Something went wrong."
		// 		console.error(e.message)
		// 	} else
		// 		this.error = response.data

		// 	this.failed = true
		// } finally {
		// 	this.pending = false
		// }
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