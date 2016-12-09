import React from 'react'
import { observer } from 'mobx-react'
import MDatePicker from 'material-ui/DatePicker'

const DatePicker = ({ field, ...rest }) => (
   <MDatePicker
   	  name={field.name}
	  value={field.value || new Date()}
	  hintText={field.placeholder}
	  disabled={field.disabled}
	  onChange={(e, date) => { field.value = date }}
	  onFocus={field.onFocus}
	  onBlur={field.onBlur}
	  {...rest}
	  style={{ marginTop: 10 }} />
)

export default observer(DatePicker)