import service from '../utils/request'

export function login(info) {
  return service({
    url: '/user/login',
    method: 'post',
    data: info
  })
}

export function register(info) {
  return service({
    url: '/user/register',
    method: 'post',
    data: info
  })
}