import axios from 'axios'
import {error, URL} from '../utils'
import {deleteAuthToken, getAuthToken} from '../localStorage'
import {Modal} from 'antd'

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

service.interceptors.response.use(response => {
  return response
}, error => {
  if (error.response.status === 403) {
    Modal.error({
      content: '授权失效',
      centered: true,
    })
    deleteAuthToken()
  }
  console.log(error)
  Promise.reject(error)
})

export default service