import request from '../utils/request'

export function login(data) {
  return request({
    url: '/vanilla/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/vanilla/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vanilla/user/logout',
    method: 'post'
  })
}