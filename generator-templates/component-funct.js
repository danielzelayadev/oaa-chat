import React from 'react'{{#if observer}}
import { observer } from 'mobx-react'{{/if}}{{#if stylesheet}}
import styles from './{{properCase name}}.css'{{/if}}

const {{properCase name}} = props => (
	<div>
		{{properCase name}}
	</div>
)

export default {{#if observer}}observer({{properCase name}})
               {{~else}}{{properCase name}}{{/if}}