import React from 'react'
import TextField from 'material-ui/TextField'
import { blue500 } from 'material-ui/styles/colors'

const Input = ({ input, meta, ...rest }) => (
	<TextField {...input} {...rest} 
		errorText={meta.touched && meta.error ? meta.error : ''} />
)

export default Input