import { observable, computed, action } from 'mobx'
import axios from 'axios'
import { UsersStore, RoomsStore } from '.'
import { auth, get, cache } from '../utils'
import { API } from '../constants'

class SessionStore {
	@observable token = get('token')
	@observable user  = get('user')

	@observable friendsFilter = ""

	@observable error = ""
	@observable pending = false
	@observable loginFailed = false

	@action async fetch () {
		if (this.user)
			return

		console.log('Fecthing user')
		
		try {
			const response = await axios.get(`${API}/me`, auth(this.token))
			this.user = response.data
			cache('user', this.user)
		} catch (e) {
			console.error(e)
		} finally {

		}
	}

	@computed get filteredFriends() {
		const matchesFilter = new RegExp(this.friendsFilter, "i")
		return this.user.friends.filter(e => !this.friendsFilter || matchesFilter.test(e.username))
	}

	@computed get fullname() {
		return this.user ? `${this.user.firstname} ${this.user.lastname}` : ''
	}

	@computed get loggedIn () {
		return this.token
	}

	@action async login (creds) {
		if (this.loggedIn || this.pending)
			return

		this.pending = true
		this.loginFailed = false

		try {
			const response = await axios.post(`${API}/login`, creds)
			const { hash } = response.data
			this.token = hash
			cache('token', this.token)
		} catch (e) {
			const response = e.response

			if (!response) {
				this.error = "Something went wrong."
				console.error(e.message)
			} else
				this.error = response.data.message

			this.loginFailed = true
		} finally {
			this.pending = false
		}
	}

	@action logout () {
		this.token = null
		this.user = null
		UsersStore.users = null
		RoomsStore.rooms = null
		RoomsStore.openRoom = null
		cache('token', "")
		cache('user', "")
		cache('users', "")
		cache('rooms', "")
	}

	@action async friend (user) {
		this.user.friends.push(user)

		try {
			await axios.post(`${API}/users/add-friend`, 
				{ username: user.username }, auth(this.token))
		} catch (e) {
			const response = e.response

			if (!response)
				console.error(e.message)
			else
				console.error(response.data.message)

			this.error = "The change you made has not been saved. Try reloading."
		}
	}

	@action unfriend (friend) {
		this.user.friends = this.user.friends.filter(e => e.username !== friend.username)
	}

	@action join (room) {
		this.user.rooms.push(room)
	}

	@action exit (room) {
		this.user.rooms = this.user.rooms.filter(e => e.name !== room.name)
	}

	isFriend (user) {
		return this.user.friends.filter(e => e.username === user.username).length > 0
	}

	isInRoom (room) {
		return room.admin === this.user.username ||
	           room.members.filter(e => e.username === this.user.username).length > 0
	}

}

export default new SessionStore