import React from 'react'
import { observer } from 'mobx-react'
import TextField from 'material-ui/TextField'

const Input = ({ field, type = null }) => (
   <TextField
	  type={type || 'text'}
	  name={field.name}
	  value={field.value}
	  floatingLabelText={field.label}
	  hintText={field.placeholder}
	  errorText={ field.touched && field.error }
	  disabled={field.disabled}
	  onChange={field.onChange}
	  onFocus={field.onFocus}
	  onBlur={field.onBlur}/>
)

export default observer(Input)