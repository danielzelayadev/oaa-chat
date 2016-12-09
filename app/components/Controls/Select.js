import React from 'react'
import { observer } from 'mobx-react'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

const Select = ({ field, options, ...rest }) => (
   <SelectField
	  name={field.name}
	  value={field.value}
	  floatingLabelText={field.label}
	  hintText={field.placeholder}
	  errorText={ field.touched && field.error }
	  disabled={field.disabled}
	  onChange={(e, i, val) => { field.value = val  }}
	  onFocus={field.onFocus}
	  onBlur={field.onBlur}
	  {...rest}>
	  	{ options.map((e, i) => (
	  		<MenuItem key={i} {...e} />
	  	)) }
	  </SelectField>
)

export default observer(Select)