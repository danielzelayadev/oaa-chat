import React from 'react'
import { render } from 'react-dom'
import configureStore from './configureStore'
import Root from './components/Root'
import style from './style.css'

const store = configureStore()

render(
	<Root store={store} />,
	document.getElementById('app')
)