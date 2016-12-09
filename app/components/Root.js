import React from 'react'
import Routes from './Routes'

import injectTapEventPlugin from 'react-tap-event-plugin'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

injectTapEventPlugin()

const Root = () => (
	<MuiThemeProvider>
		<Routes />
	</MuiThemeProvider>
)

export default Root