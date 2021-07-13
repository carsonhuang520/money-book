import axios from 'axios'
import {URL} from '../utils'
import {getAuthToken} from '../localStorage'

const service = axios.create({
  baseURL: URL,
  timeout: 20000
})

service.interceptors.request.use(config => {
  config.headers['token'] = getAuthToken() || ''
  return config
}, error => {
  console.log(error)
  Promise.reject(error)
})

export default service