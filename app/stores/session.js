import { observable, computed, action } from 'mobx'
import axios from 'axios'
import { API } from '../constants'

class SessionStore {
	@observable token
	@observable user

	@observable friendsFilter = ""

	@observable error
	@observable pending = false
	@observable loginFailed = false

	constructor () {
		const userstr = window.localStorage['user']
		const tokenstr = window.localStorage['token']

		this.token = tokenstr ? tokenstr : ""
		this.user = userstr ? JSON.parse(userstr) : ""
		if (typeof this.user === 'object') {
			this.user.friends = []
			this.user.rooms = []
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
		return this.user !== ""
	}

	@action async login (creds) {
		if (this.loggedIn || this.pending)
			return

		this.pending = true
		this.loginFailed = false

		try {
			const response = await axios.post(`${API}/login`, creds)
			const { token, ...user } = response.data
			this.token = window.localStorage['token'] = token
			this.user = user
			window.localStorage['user'] = JSON.stringify(user)
		} catch (e) {
			const response = e.response

			if (!response) {
				this.error = "Something went wrong."
				console.error(e.message)
			} else
				this.error = response.data

			this.loginFailed = true
		} finally {
			this.pending = false
		}
	}

	@action logout () {
		this.token = window.localStorage['token'] = ""
		this.user = window.localStorage['user'] = ""
	}

	@action friend (user) {
		this.user.friends.push(user)
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