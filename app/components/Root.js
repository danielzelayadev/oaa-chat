import React from 'react'
import { Provider } from 'react-redux'
import Routes from './Routes'

import injectTapEventPlugin from 'react-tap-event-plugin'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

injectTapEventPlugin()

const Root = ({ store }) => (
	<Provider store={store}>
		<MuiThemeProvider>
			<Routes />
		</MuiThemeProvider>
	</Provider>
)

export default Root