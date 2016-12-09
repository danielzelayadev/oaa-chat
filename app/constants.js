import validatorjs from 'validatorjs'

export const API = 'http://localhost:8000'
export const plugins = { dvr: validatorjs }

export const REGEX_EMAIL =  /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/igm
export const REGEX_PASSWORD = /^(?=.*[A-Z])(?=.*\d.*\d)[A-Za-z\d]{8,}$/