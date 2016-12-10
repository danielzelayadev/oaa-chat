import { observable, action, computed } from 'mobx'

class UIStore {
	@observable drawer
	@observable drawerClosing = false

	@action setDrawer (drawer) {
		this.drawer = drawer
	}

	@action closeDrawer () {
		this.drawerClosing = true
		setTimeout(() => {
			this.drawer = undefined
			this.drawerClosing = false
		}, 350)
	}

	@computed get drawerIsOpen () {
		return this.drawer !== undefined
	}
}

export default new UIStore