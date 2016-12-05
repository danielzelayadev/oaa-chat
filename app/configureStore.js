import { createStore } from 'redux'
import oaaChat from './reducers'

const configureStore = () => {
	const store = createStore(oaaChat)

	return store
}

export default configureStore