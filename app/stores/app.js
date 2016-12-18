import { observable, computed, action } from 'mobx'
import axios from 'axios'
import { SessionStore, UsersStore, RoomsStore } from '.'
import { API } from '../constants'

class AppStore {
	@observable connection = new WebSocket("ws://echo.websocket.org/")
	@observable loading = false

	@action async fetch() {
		this.loading = true
		await SessionStore.fetch()
		await RoomsStore.fetch()
		await UsersStore.fetch()
		this.loading = false
	}

}

export default new AppStore