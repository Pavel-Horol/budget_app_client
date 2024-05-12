import axios from 'axios'
import { getToken } from '../helper/localstorage.helper.ts'

export const instance = axios.create({
	baseURL: 'http://localhost:3000/api',
	headers: {
		Authorization: `Bearer ` + getToken(),

	}
})