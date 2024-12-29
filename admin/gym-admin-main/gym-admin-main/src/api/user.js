import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/api/v1/user/login',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: '/api/v1/user/profile',
    method: 'post'
  })
}

export function logout() {
  return request({
    url: '/api/v1/user/logout',
    method: 'get'
  })
}

export function getUserList() {
  return request({
    url: '/api/v1/user/list',
    method: 'post'
  })
}

export function UpdateUser(data) {
  return request({
    url: '/api/v1/user/update',
    method: 'post',
    data
  })
}
