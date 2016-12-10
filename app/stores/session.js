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

		if (this.user)
			this.user.friends = [
	{ username: 'Alejandro Ferrera', avatar: 'http://i.imgur.com/fxjAn60.jpg?2' },
	{ username: 'Andres Rodriguez', avatar: 'http://i.imgur.com/eI876Lg.jpg' },
	{ username: 'Kelvin Chinchilla', avatar: 'http://data.whicdn.com/images/123313634/superthumb.jpg' },
	{ username: 'David Chavarria', avatar: 'https://s-media-cache-ak0.pinimg.com/564x/0f/96/ca/0f96cacbdd3a845f10c50d70417257de.jpg' },
	{ username: 'Brandon Napky', avatar: 'http://orig00.deviantart.net/9f3a/f/2014/056/2/5/profile_picture_by_anime_alyssa-d780int.png' },
	{ username: 'David Canales', avatar: 'http://images.akamai.steamusercontent.com/ugc/394423611546967578/0A399E484999EC17F0EE6F90276745BA57BAFABF/' },
	{ username: 'Ahmed Castro', avatar: 'http://www.polyvore.com/cgi/img-thing?.out=jpg&size=l&tid=121862518' },
	{ username: 'Carlos Castro', avatar: 'http://orig06.deviantart.net/3d54/f/2011/364/a/1/profile_picture_by_shironekoix-d4ks8nx.jpg' },
	{ username: 'Roberto Melara', avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQa0r67dMWlWdagBfhGUthQ-PCjTlPrMbFNjOWgylp5k7j5Q_1a' },
	{ username: 'Roberto Melara', avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQa0r67dMWlWdagBfhGUthQ-PCjTlPrMbFNjOWgylp5k7j5Q_1a' },
	{ username: 'Roberto Melara', avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQa0r67dMWlWdagBfhGUthQ-PCjTlPrMbFNjOWgylp5k7j5Q_1a' },
	{ username: 'Roberto Melara', avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQa0r67dMWlWdagBfhGUthQ-PCjTlPrMbFNjOWgylp5k7j5Q_1a' },
]
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

}

export default new SessionStore