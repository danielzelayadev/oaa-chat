import { observable, action, computed } from 'mobx'

class DrawerStore {
	@observable drawers = 0
	@observable drawerClosing = 0

	@action push () {
		return ++this.drawers
	}

	@action pop (all = undefined) {
		this.drawerClosing = this.drawers
		setTimeout(() => {
			if (all === 0)
				this.drawers = 0
			else
				this.drawers--
			console.log(this.drawers)
			this.drawerClosing = 0
		}, 350)
	}
}

export default new DrawerStore