import React, { Component } from 'react'{{#if observer}}
import { observer } from 'mobx-react'{{/if}}{{#if stylesheet}}
import styles from './{{properCase name}}.css'{{/if}}

{{#if observer}}@observer {{/if}}class {{properCase name}} extends Component {
	render () {
		return (
			<div>
				{{properCase name}}
			</div>
		)
	}
}

export default {{properCase name}}