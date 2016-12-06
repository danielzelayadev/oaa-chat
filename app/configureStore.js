import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import oaaChat from './reducers'

const configureStore = () => {
	const store = createStore(
		oaaChat, applyMiddleware(thunk, logger()))

	return store
}

export default configureStore